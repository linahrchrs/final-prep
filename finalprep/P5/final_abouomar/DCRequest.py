class DCRequest:
    def __init__(self, documentPath=None, targetFormat=None, qualityLevel=None):
        self.documentPath = documentPath
        self.targetFormat = targetFormat
        self.qualityLevel = qualityLevel
    
    def getDocumentPath(self):
        return self.documentPath
    
    def setDocumentPath(self, documentPath):
        self.documentPath = documentPath
    
    def getTargetFormat(self):
        return self.targetFormat
    
    def setTargetFormat(self, targetFormat):
        self.targetFormat = targetFormat
    
    def getQualityLevel(self):
        return self.qualityLevel
    
    def setQualityLevel(self, qualityLevel):
        self.qualityLevel = qualityLevel
