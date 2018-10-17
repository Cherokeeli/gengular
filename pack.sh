# 填需要的上传的git目录
upload_path="/Users/quanli422/Projects/xuguangwu486_osh-oms"

# build并执行git上传
npm run build:prd && cap dist.zip $upload_path && cd $upload_path && git pull origin master && git add dist.zip && git commit -m 'new front pack' && git push origin master