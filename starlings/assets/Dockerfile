FROM public.ecr.aws/lambda/nodejs:14

ADD ../package.json ${LAMBDA_TASK_ROOT}

RUN npm install

COPY handlers/app.js  ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ]

