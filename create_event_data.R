suppressPackageStartupMessages({
  require(elevatr)
  require(tidyverse)
  require(sf)
  require(jsonlite)
})

if(interactive()){
  .args = c('/Users/hamishgibbs/Documents/Personal/espanola_tortoise_release/processed_data/preprocessed_data.rds',
            '/Users/hamishgibbs/Documents/Personal/espanola_tortoise_release/build/events.json')
}else{
  .args = commandArgs(trailingOnly = T)
}

print('Reading input data.')

d <- read_rds(.args[1]) 


#do distance travelled not elevation

d <- d %>% st_as_sf(coords = c("LAST LONGITUDE", "LAST LATITUDE"), crs = 4326)

get_lagged_distance <- function(data){
  
  data <- data %>% arrange(dt_unix)
  
  distances <- c(NA)
  
  for (i in 1:length(data$geometry)){
    if (i > 1){
      distances <- append(distances, as.numeric(st_distance(data %>% slice(i) %>% pull(geometry), data %>% slice(i - 1) %>% pull(geometry))) / 1000)
    }
  }
  
  data$distance <- distances
  
  data <- data %>% select(id, dt_unix, distance) %>% 
    arrange(dt_unix) %>% 
    st_set_geometry(NULL) %>% 
    mutate(distance = ifelse(is.na(distance), 0, distance),
           distance_noncum = distance / sum(distance),
           distance = cumsum(distance),
           distance_text = paste0(round(distance, 2), ' km'))
  
  return(data)
}

d <- lapply(d %>% group_by(id) %>% group_split(.keep = "all"), get_lagged_distance) 

d <- do.call(rbind, d)

write(jsonlite::toJSON(d), tail(.args, 1))

print('Successfully written events.json.')

#make unrolling line plot of distance with events



