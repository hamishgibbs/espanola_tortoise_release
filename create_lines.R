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
  #testthat::expect_gte(input_data %>% pull(dt) %>% max() %>% as.Date(), Sys.Date() - 1)
})

#convert to sf
pts <- st_as_sf(input_data, coords = c("LAST LONGITUDE", "LAST LATITUDE"), crs = 4326)

id_groups <- input_data %>% 
  group_by(id) %>% 
  arrange(dt_unix) %>% 
  group_split()

create_time_line <- function(df){
  
  id <- df %>% pull('id') %>% unique()
  
  if (length(id) > 1){stop("id length > 1")}
  
  point_matrix <- matrix(nrow = length(df %>% pull(1)), ncol = 2)
  for (i in 1:length(df %>% pull(1))){
    point_matrix[i,1] <- df %>% slice(i) %>% pull(`LAST LONGITUDE`)
    point_matrix[i,2] <- df %>% slice(i) %>% pull(`LAST LATITUDE`)
  }
  
  ldf <- data.frame(id = id, geometry = st_sfc(st_linestring(point_matrix)))
  
  return(ldf)
  
}

lines <- lapply(id_groups, create_time_line)

lines <- do.call(rbind, lines)

lines <- st_as_sf(lines, crs = 4326)

write_rds(lines, tail(.args, 1))

file.remove(gsub('processed_data/lines.rds', 'build/lines.geojson', tail(.args, 1)))

st_write(lines, gsub('processed_data/lines.rds', 'build/lines.geojson', tail(.args, 1)))

file.rename(gsub('processed_data/lines.rds', 'build/lines.geojson', tail(.args, 1)), gsub('processed_data/lines.rds', 'build/lines.json', tail(.args, 1)))

print('Successfully written lines.rds.')
