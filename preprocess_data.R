suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('data/tortoise_locations_latest.xls', 'processed_data/preprocessed_data.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

input_data <- readxl::read_xls(.args[1], skip = 4) %>% 
  slice(1:(n() - 7))

input_data <- input_data %>% 
  tidyr::drop_na("Longitude") %>% 
  dplyr::rename(id = `ASSET ID`,
                dt = `TIME REPORTED`,
                `LAST LONGITUDE` = Longitude,
                `LAST LATITUDE` = Latitude) %>% 
  dplyr::mutate(dt = as.POSIXlt(dt),
                dt_unix = as.numeric(dt),
                `LAST LONGITUDE` = as.numeric(`LAST LONGITUDE`),
                `LAST LATITUDE` = as.numeric(`LAST LATITUDE`)) %>% 
  filter(dt >= as.POSIXct('2020-06-15 14:00:00'))

#drop any records with <2 points
#more_than_2_pts <- input_data %>% group_by(id) %>% 
#  summarise(n = n(), .groups='drop') %>% 
#  filter(n >= 2) %>% pull(id)

#input_data <- input_data %>% 
#  filter(id %in% more_than_2_pts)

write_rds(input_data, tail(.args, 1))

print('Successfully written preprocessed_data.rds.')
