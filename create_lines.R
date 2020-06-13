suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('data/test_data.csv', 'processed_data/lines.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

input_data <- read_csv(.args[1], col_types = cols()) %>% 
  tidyr::drop_na("LAST LONGITUDE") %>% 
  dplyr::rename(id = `ASSET ID`)

#convert to sf
pts <- st_as_sf(input_data, coords = c("LAST LONGITUDE", "LAST LATITUDE"), crs = 4326)

lines <- pts %>% 
  group_by(id) %>% 
  summarize(.groups = "keep") %>% 
  st_cast("LINESTRING")

write_rds(lines, tail(.args, 1))

print('Success.')
