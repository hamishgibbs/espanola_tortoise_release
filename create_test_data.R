n = 4
test_data <- tibble(id = rep(paste0('T', stringr::str_pad(as.character(1:15), width = 5, pad = '0', side = 'left')), n),
                    `LAST LATITUDE` = runif(15 * n, 0, 90),
                    `LAST LONGITUDE` = runif(15 * n, 0, 180),
                    day = lapply(1:n, rep, 15) %>% unlist(),
                    date = lubridate::make_date(2020, 12, day)) %>% 
  dplyr::select(-day)

write_csv(test_data, '~/Documents/Personal/espanola_tortoise_release/data/test_data.csv')
