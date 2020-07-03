FROM python:3.8-alpine
WORKDIR /srv/app
COPY src .
COPY requirements.txt .

RUN apk add --no-cache build-base
RUN pip install --no-cache-dir -r requirements.txt

CMD [ "uvicorn", "--host", "0.0.0.0", "main:web" ]