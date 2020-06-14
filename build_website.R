source('test_website_build.R')
Sys.setenv(RSTUDIO_PANDOC = "/Applications/RStudio.app/Contents/MacOS/pandoc")
rmarkdown::render_site()
test_website_build()