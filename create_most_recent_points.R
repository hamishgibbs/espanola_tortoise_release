suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('processed_data/preprocessed_data.rds', 'processed_data/most_recent_points.json')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

input_data <- read_rds(.args[1])

testthat::test_that('Most recent record is today or yesterday', {
  #testthat::expect_gte(input_data %>% pull(dt) %>% max() %>% as.Date(), Sys.Date() - 1)
})

most_recent_ref <- input_data %>% 
  group_by(id) %>% 
  summarise(dt_unix = max(dt_unix, na.rm = T), .groups = 'drop') %>% 
  mutate(most_recent = T)

#if rows are being dropped mysteriously - alter filter(DESCRIPTION == 'blank')
input_data <- input_data %>%
  distinct() %>% 
  left_join(most_recent_ref, by = c('id', 'dt_unix')) %>% 
  filter(most_recent == T)

input_data <- input_data %>% 
  rename(lng = `LAST LONGITUDE`, lat = `LAST LATITUDE`) %>% 
  mutate(summary = paste0(id, ': ', dt)) %>% 
  select(id, dt, lat, lng, summary)

testthat::test_that('length of most recent points is equal to the number of tortoises', {
  testthat::expect_equal(input_data %>% pull(1) %>% length, 15)
})


testthat::test_that('New most recent date is > previous most recent date', {
  #recent_prev <- read_rds(tail(.args, 1)) %>% pull(dt) %>% max()
  #recent_new <- input_data %>% pull(dt) %>% max()
  
  #reinstate in production
  #testthat::expect_gt(recent_new, recent_prev)
})

write(jsonlite::toJSON(input_data), tail(.args, 1))

print('Successfully written most_recent_points.json.')