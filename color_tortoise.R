require(magick)

color_tortoise <- function(hex_color, id){
  tort <- image_read("https://static.thenounproject.com/png/1378132-200.png")
}
?magick::image_colorize
?image_colorize


img.r[img.r == "#00000000"] <- 'red'

library(png)
library(grid)
img = readPNG('images/tort.png') # read black (background) and white (figure) image
img.r <- as.raster(img,interpolate=F)
unique(img.r)
img.r[img.r != "#00000000"] <- '#620183'
plot.new()
grid.raster(img.r)
writeRaster(img.r, 'images/tort1.png')
require(raster)

plot.new()
grid.raster(as.raster(img,interpolate=F))
