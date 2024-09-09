FROM python:3.10.13
ARG REDIS_URL
ENV REDIS_URL=$REDIS_URL

# Create a virtual environment
RUN python -m venv /opt/venv
ENV PATH=/opt/venv/bin:$PATH

WORKDIR /code
 
# Copy and install requirements first (for better caching)
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application
COPY . .

EXPOSE 4000

# Create a startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Use the startup script as the entry point
CMD ["/start.sh"]