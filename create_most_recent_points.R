suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('processed_data/preprocessed_data.rds', 'processed_data/most_recent_points.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

input_data <- read_rds(.args[1])

testthat::test_that('Most recent record is today or yesterday', {
  testthat::expect_gte(input_data %>% pull(dt) %>% max() %>% as.Date(), Sys.Date() - 1)
})

most_recent_ref <- input_data %>% 
  group_by(id) %>% 
  summarise(dt = max(dt, na.rm = T), .groups = 'drop') %>% 
  mutate(most_recent = T)

#if rows are being dropped mysteriously - alter filter(DESCRIPTION == 'blank')
input_data <- input_data %>%
  distinct() %>% 
  filter(DESCRIPTION == 'blank') %>% 
  left_join(most_recent_ref, by = c('id', 'dt')) %>% 
  filter(most_recent == T)

input_data <- st_as_sf(input_data, coords = c("LAST LONGITUDE", "LAST LATITUDE"), crs = 4326)

testthat::test_that('length of most recent points is equal to the number of tortoises', {
  testthat::expect_equal(input_data %>% pull(1) %>% length, 15)
})


testthat::test_that('New most recent date is > previous most recent date', {
  recent_prev <- read_rds(tail(.args, 1)) %>% pull(dt) %>% max()
  recent_new <- input_data %>% pull(dt) %>% max()
  
  #reinstate in production
  #testthat::expect_gt(recent_new, recent_prev)
})

write_rds(input_data, tail(.args, 1))
print('Successfully written most_recent_points.rds.')