#Calculate average message length per user - Who writes the longest messages?

from pyspark import SparkContext, SparkConf

MASTER_URL = "spark://10.10.10.10:7070"
APP_NAME = "averagePerUser"

conf = SparkConf().setAppName(APP_NAME).setMaster(MASTER_URL)
sc = SparkContext(conf=conf)

#the CSV file contains messageid, userid, roomid, messagetype, timestamp, message_length
message_csv = "messages.csv"
output_path = "path/to/file"

linesRDD = sc.textFile("messages_csv")

header = linesRDD.first()
dataRDD = linesRDD.filter(lambda line: line != header)

messagesRDD = dataRDD.map(lambda line: line.splitBy(","))

messagesPerUserRDD = messagesRDD.map(lambda m: (m[1],(int(m[5]),1)))

sumCountRDD = messagesPerUserRDD.reduceByKey(lambda a,b: a[0]+b[0], a[1]+b[1])

avgMsgLengthRDD = sumCountRDD.map(lambda x: (x[0], x[1][0] / x[1][1]))

sortedRDD = avgMsgLengthRDD.sortBy(lambda x: x[1], ascedning = False)

sortedRDD.map(lambda x: {'User ID': x[0], 'Average Message Length'; x[1]}).saveTextAsFile(output_path)

sc.stop()