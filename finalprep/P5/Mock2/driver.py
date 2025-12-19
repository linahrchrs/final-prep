from pyspark import SparkConf
from pyspark.streaming import StreamingContext
import json

# Spark configuration
conf = SparkConf().setAppName("EventTypeCount").setMaster("local[*]")
ssc = StreamingContext(conf, 5)  # 5-second batch interval

# Read from socket
lines = ssc.socketTextStream("localhost", 9999)

# Parse JSON and extract eventType
event_types = lines.map(lambda line: json.loads(line)) \
                   .map(lambda event: event.get("eventType", "UNKNOWN"))

# Count event types per batch
event_counts = event_types.map(lambda e: (e, 1)) \
                           .reduceByKey(lambda a, b: a + b)

# Print results
event_counts.pprint()

# Start streaming
ssc.start()
ssc.awaitTermination()
