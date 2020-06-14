suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('data', 'processed_data/preprocessed_data.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

input_files <- list.files(.args[1], pattern = '.csv', full.names = T)
input_data <- lapply(input_files, read_csv, col_types = cols())

input_data <- do.call(rbind, input_data) %>% 
  select(-LOCATIONS, -`LAST SEEN LOCATION`) %>% 
  tidyr::drop_na("LAST LONGITUDE") %>% 
  dplyr::rename(id = `ASSET ID`,
                dt = `LAST SEEN TIME`) %>% 
  dplyr::mutate(dt = as.POSIXlt(dt))
  #filter greater than a certain date here  


write_rds(input_data, tail(.args, 1))

print('Successfully written preprocessed_data.rds.')
