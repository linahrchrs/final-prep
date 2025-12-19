"""
 * Document Conversion Processing with Spark
"""
from pyspark import SparkContext, SparkConf

class DocumentProcessor:
    MASTER_URL = "spark://10.10.10.10:7070"
    APP_NAME = "DocumentConversion"
    
    @staticmethod
    def process_dc_requests(requests):
        conf = SparkConf().setAppName(DocumentProcessor.APP_NAME).setMaster(DocumentProcessor.MASTER_URL)
        sc = SparkContext(conf=conf)
        
        requestRDD = sc.parallelize(requests)

   
        conversionResultRDD = requestRDD.map(lambda request: (request.getTargetFormat(), get_conversion_time(request.getDocumentPath(), request.getTargetFormat(), request.getQualityLevel())))
        
       
        totalConversionTimeByFormatRDD = conversionResultRDD.reduceByKey(lambda a, b: a + b)
        
        totalConversionTimesByFormat = totalConversionTimeByFormatRDD.collect()
        
        for targetFormat, totalTime in totalConversionTimesByFormat:
            print(str(targetFormat) + " : " + str(totalTime))
        
        sc.stop()
        return totalConversionTimesByFormat

#why if __name__ == "__main__":
if __name__ == "__main__":
    requests = [
        DCRequest("/docs/file1.txt", "PDF", "High"),
        DCRequest("/docs/file2.txt", "PDF", "Medium"),
        DCRequest("/docs/file3.txt", "DOCX", "High"),
        DCRequest("/docs/file4.txt", "PDF", "Low"),
        DCRequest("/docs/file5.txt", "TXT", "Medium"),
        DCRequest("/docs/file6.txt", "DOCX", "High"),
        DCRequest("/docs/file7.txt", "TXT", "Low"),
        DCRequest("/docs/file8.txt", "PDF", "High"),
        DCRequest("/docs/file9.txt", "DOCX", "Medium"),
        DCRequest("/docs/file10.txt", "TXT", "High")
    ]
    
    DocumentProcessor.process_dc_requests(requests)