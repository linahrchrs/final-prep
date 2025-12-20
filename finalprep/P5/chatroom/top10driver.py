from pyspark import SparkContext, SparkConf

MASTER_URL = "spark://10.10.10.10:7070"
APP_NAME = "top10active"

conf = SparkConf().setAppName(APP_NAME).setMaster(MASTER_URL)
sc = SParkContext(conf=conf)

message = "messages.csv"

linesRDD = sc.textFile(message)

header = linesRDD.first()
dataRDD = linesRDD.filter(lambda line: line != header)

messageRDD = dataRDD.map(lambda line: line.splitBy(","))

userRDD = messageRDD.map(lambda u: (u[1], 1))

countMsgRDD = userRDD.reduceByKey(lambda a,b: a+b)

sortedRDD = countMsgRDD.sortBy(lambda x: x[1], ascending = False)

top10RDD = sc.parallelize(sortedRDD.take(10))

for user in top10RDD:
    print(f"User ID: {user[0]}, Messages: {user[1]}")

sc.stop()