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

most_recent_ref <- input_data %>% 
  group_by(id) %>% 
  summarise(dt = max(dt, na.rm = T), .groups = 'drop') %>% 
  mutate(most_recent = T)

input_data <- input_data %>%
  distinct() %>% 
  left_join(most_recent_ref, by = c('id', 'dt')) %>% 
  filter(most_recent == T)

input_data <- st_as_sf(input_data, coords = c("LAST LONGITUDE", "LAST LATITUDE"), crs = 4326)

testthat::test_that('length of most recent points is equal to length of ref', {
  testthat::expect_equal(input_data %>% pull(1) %>% length, most_recent_ref %>% pull(1) %>% length)
})

write_rds(input_data, tail(.args, 1))
print('Successfully written most_recent_points.rds.')