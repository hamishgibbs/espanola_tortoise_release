suppressPackageStartupMessages({
  require(tidyverse)
  require(sf)
})

if(interactive()){
  .args <- c('processed_data/lines.rds', 'processed_data/length_summary.rds')
}else{
  .args <- commandArgs(trailingOnly = T)
}

print('Reading input data.')

lines <- read_rds(.args[1])

#summary of distance travelled - account for units with real data
line_sum <- lines %>% 
  mutate(length = as.numeric(st_length(geometry))) %>% 
  st_set_geometry(NULL)

write_rds(line_sum, tail(.args, 1))

print('Success.')
