#Count total messages per room - Which rooms have the most activity?

from pyspark import SparkContext, SparkConf

MASTER_URL = "spark://10.10.10.10:7070"
APP_NAME = "messageCountPerRoom"

conf = SparkConf().setAppName(APP_NAME).setMaster(MASTER_URL)
sc = SparkContext(conf=conf)

#the CSV file contains messageid, userid, roomid, messagetype, timestamp, message_length
csv_file = "messages.csv"   
output_path = "path/to/file"

linesRDD = sc.textFile(csv_file)

header = linesRDD.first()
dataRDD = linesRDD.filter(lambda line: line != header)

messagesRDD = dataRDD.map(lambda line: line.split(","))

messagesCountByRoomRDD = messagesRDD.map(lambda m: (m[2], 1)).reduceByKey(lambda a,b: a+b)

sortedRDD = messagesCountByRoomRDD.sortBy(lambda x: x[1], ascending = False)

sortedRDD.map(lambda x: {'Room ID': x[0], 'Total Messaged': x[1]}).saveTextAsFile(output_path)

sc.stop()