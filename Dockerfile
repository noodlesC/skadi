#FROM docker-image.cai-inc.com/compile/node as builder
#COPY . /build/
#WORKDIR /build
#RUN npm i && npm run build
#FROM docker-image.cai-inc.com/run/nginx
#MAINTAINER wangxun
#COPY --from=builder /build/dist/ /usr/share/nginx/html
#RUN chown -R nginx:nginx /usr/share/nginx/html
#EXPOSE 80

FROM docker-image.cai-inc.com/run/nginx
MAINTAINER wangxun
COPY dist/* /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 80
