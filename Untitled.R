acaps <- read_csv('/Users/hamishgibbs/Documents/Covid-19/WHO_Interventions/WHO_Intervention_Cleaning/raw_csv_files/acaps.csv')

trackr_dir <- '/Users/hamishgibbs/Documents/Personal/trackr_dev/trackr_dir'

clean_trackr_dir('/Users/hamishgibbs/Documents/Personal/trackr_dev/trackr_dir')

acaps <- trackr_new(acaps, trackr_dir = trackr_dir, timepoint_message = 'ACAPS Raw', log_data = F)

acaps <- acaps %>% mutate(ISO = 'NULL')

acaps <- trackr_timepoint(acaps, trackr_dir = trackr_dir, timepoint_message = 'Change point #1', log_data = F)

acaps <- acaps %>% group_by(COUNTRY) %>% trackr_summarise(n = n())

acaps <- trackr_timepoint(acaps, trackr_dir = trackr_dir, timepoint_message = 'Change point #2', log_data = F)

acaps <- acaps %>% mutate(alpha = 62)

acaps <- trackr_timepoint(acaps, trackr_dir = trackr_dir, timepoint_message = 'Change point #2', log_data = F)

trackr_network(trackr_dir)
