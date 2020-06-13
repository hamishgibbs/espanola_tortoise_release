

test_website_files_creation_date <- function(){
  testthat::test_that('website files creation date is today', {
    testthat::expect_identical(as.Date(file.info('docs/index.html')$ctime), as.Date(Sys.Date()))
    testthat::expect_identical(as.Date(file.info('docs/tortoise_comparison.html')$ctime), as.Date(Sys.Date()))
    testthat::expect_identical(as.Date(file.info('docs/about.html')$ctime), as.Date(Sys.Date()))
  })
}

test_data_files_creation_date <- function(){
  testthat::test_that('data files creation date is today', {
    testthat::expect_identical(as.Date(file.info('processed_data/lines.rds')$ctime), as.Date(Sys.Date()))
    testthat::expect_identical(as.Date(file.info('processed_data/length_summary.rds')$ctime), as.Date(Sys.Date()))
  })
}

test_data_files_creation_date()

test_website_build <- function(){
  
  test_website_files_creation_date()
  
  test_data_files_creation_date()
  
}

