# --- 第一阶段：构建 (Build) ---
FROM node:20-slim AS builder

WORKDIR /app

# 复制 package.json 和 lock 文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目所有文件
COPY . .

# 执行编译（生成 build 文件夹）
RUN npm run build

# --- 第二阶段：运行 (Run) ---
FROM nginx:stable-alpine

# 将你的自定义 Nginx 配置复制到容器内
COPY default.conf /etc/nginx/conf.d/default.conf

# 将第一阶段生成的静态文件拷贝到 Nginx 的默认静态资源目录
COPY --from=builder /app/build /usr/share/nginx/html/my_learning

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]