suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('processed_data/preprocessed_data.rds', 'processed_data/lines.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

input_data <- read_rds(.args[1])

testthat::test_that('Most recent record is today or yesterday', {
  testthat::expect_gte(input_data %>% pull(dt) %>% max() %>% as.Date(), Sys.Date() - 1)
})

#convert to sf
pts <- st_as_sf(input_data, coords = c("LAST LONGITUDE", "LAST LATITUDE"), crs = 4326)

lines <- pts %>% 
  group_by(id) %>% 
  arrange(dt) %>% 
  summarize(n = n(),
            .groups = "drop") %>% 
  mutate(geom_type = st_geometry_type(geometry)) %>% 
  filter(geom_type == 'MULTIPOINT') %>% 
  st_cast("LINESTRING")

write_rds(lines, tail(.args, 1))

print('Successfully written lines.rds.')
