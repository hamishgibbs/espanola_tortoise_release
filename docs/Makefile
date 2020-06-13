PROJDIR := ~/Documents/Personal/espanola_tortoise_release
RAW_DIR := ${PROJDIR}/data
DATA_DIR := ${PROJDIR}/processed_data
SITE_DIR := ${PROJDIR}/docs

R = /usr/local/bin/Rscript $^ $@


default: process_data build_website push_site

push_site: ${SITE_DIR}/index.html
	git add . 
	git commit -m "automatic website build"
	git push

build_website: ${SITE_DIR}/index.html

process_data: ${DATA_DIR}/lines.rds ${DATA_DIR}/length_summary.rds

${DATA_DIR}/lines.rds: ${PROJDIR}/create_lines.R ${RAW_DIR}/assets_2020-06-13_102331.csv
	${R}

${DATA_DIR}/length_summary.rds: ${PROJDIR}/create_length_summary.R ${DATA_DIR}/lines.rds
	${R}

${SITE_DIR}/index.html: ${PROJDIR}/build_website.R ${DATA_DIR}/lines.rds ${DATA_DIR}/length_summary.rds ${PROJDIR}/index.Rmd ${PROJDIR}/tortoise_comparison.Rmd ${PROJDIR}/about.Rmd
	${R}


