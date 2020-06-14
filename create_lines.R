suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('data', 'processed_data/lines.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

input_files <- list.files(.args[1], pattern = '.csv', full.names = T)
input_data <- lapply(input_files, read_csv, col_types = cols())

input_data <- do.call(rbind, input_data) %>% 
  tidyr::drop_na("LAST LONGITUDE") %>% 
  dplyr::rename(id = `ASSET ID`,
                dt = `LAST SEEN TIME`) %>% 
  dplyr::mutate(dt = as.POSIXlt(dt))
#filter greater than a certain date here  

#convert to sf
pts <- st_as_sf(input_data, coords = c("LAST LONGITUDE", "LAST LATITUDE"), crs = 4326)


lines <- pts %>% 
  group_by(id) %>% 
  arrange(dt) %>% 
  summarize(n = n(),
            .groups = "keep") %>% 
  ungroup() %>% 
  slice(c(1:4, 9:12)) %>% 
  st_cast("LINESTRING")

write_rds(lines, tail(.args, 1))

print('Success.')
