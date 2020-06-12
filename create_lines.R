suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('data/test_data.csv', 'processed_data/lines.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

input_data <- read_csv(.args[1], col_types = cols())

#convert to sf
pts <- st_as_sf(input_data, coords = c("lon", "lat"), crs = 4326)

lines <- pts %>% 
  group_by(id) %>% 
  summarize() %>% 
  st_cast("LINESTRING")

write_rds(lines, tail(.args, 1))




#makefile
