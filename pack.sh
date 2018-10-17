upload_path="/Users/quanli422/Projects/xuguangwu486_osh-oms"

npm run build:prd && cp dist.zip $upload_path && git pull origin master && git add . && git commit -m 'new front pack' && git push origin master