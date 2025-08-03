'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Copy, Languages, Download, History, Type, Sun, Moon, 
  Maximize2, Minimize2, FileText, FileSpreadsheet, 
  Database, RotateCcw, Zap, BookOpen, Settings,
  Eye, EyeOff, Hash, Clock
} from 'lucide-react'

// Enhanced Character mapping for Arabic to Kurdish conversion
const arabicToKurdishMap = {
  // Complex diacritical combinations - process these first
  'لاَ': 'ڵا',  // New mapping added
  'رِ': 'ڕ',
  'ىَ': 'ێ', 
  'لَ': 'ڵ',
  
  // Simple character mappings
  'ض': 'چ',
  'ص': 'ص',
  'ث': 'پ',
  'ق': 'ق',
  'ف': 'ف',
  'غ': 'غ',
  'ع': 'ع',
  'ه': 'ه',
  'خ': 'خ',
  'ح': 'ح',
  'ج': 'ج',
  'د': 'د',
  'ط': 'گ',
  'ك': 'ک',
  'م': 'م',
  'ن': 'ن',
  'ت': 'ت',
  'ا': 'ا',
  'ل': 'ل',
  'ب': 'ب',
  'ي': 'ی',
  'س': 'س',
  'ش': 'ش',
  'ئ': 'ئ',
  'ء': 'و',
  'ؤ': 'ۆ',
  'ر': 'ر',
  'لا': 'لا',
  'ى': 'ی',
  'ة': 'ە',
  'و': 'و',
  'ز': 'ز',
  'ظ': 'ڤ'
}

// Sample texts for testing
const sampleTexts = [
  {
    name: "Basic Greeting",
    arabic: "مرحبا بكم",
    description: "Simple Arabic greeting"
  },
  {
    name: "Complex Text",
    arabic: "رِ ىَ لَ لاَ في هذا النص العربي الجميل",
    description: "Text with complex diacritical combinations"
  },
  {
    name: "Special Characters",
    arabic: "ء ؤ ة ض ث ط",
    description: "Text with special character mappings"
  },
  {
    name: "Long Sentence",
    arabic: "هذا نص طويل باللغة العربية يحتوي على كلمات مختلفة وحروف متنوعة لاختبار التحويل",
    description: "Long Arabic sentence for comprehensive testing"
  }
]

// Enhanced conversion function
const convertArabicToKurdish = (text) => {
  if (!text) return ''
  
  let convertedText = text
  
  // First, handle complex diacritical combinations (including new mapping)
  const complexPatterns = ['لاَ', 'رِ', 'ىَ', 'لَ']
  complexPatterns.forEach(pattern => {
    if (arabicToKurdishMap[pattern]) {
      const regex = new RegExp(pattern, 'g')
      convertedText = convertedText.replace(regex, arabicToKurdishMap[pattern])
    }
  })
  
  // Then handle simple character mappings
  convertedText = convertedText.split('').map(char => {
    return arabicToKurdishMap[char] || char
  }).join('')
  
  return convertedText
}

// Utility functions for text analysis
const getWordCount = (text) => {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

const getStats = (text) => {
  const chars = text.length
  const words = getWordCount(text)
  const lines = text.split('\n').length
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length
  return { chars, words, lines, arabicChars }
}

// Download functions
const downloadAsText = (originalText, convertedText, filename = 'arabic-kurdish-conversion') => {
  const content = `Arabic to Kurdish Conversion\n${'='.repeat(50)}\n\nOriginal Arabic Text:\n${originalText}\n\nConverted Kurdish Text:\n${convertedText}\n\nGenerated on: ${new Date().toLocaleString()}`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadAsJSON = (originalText, convertedText, filename = 'arabic-kurdish-conversion') => {
  const data = {
    conversion: {
      original: originalText,
      converted: convertedText,
      timestamp: new Date().toISOString(),
      stats: {
        original: getStats(originalText),
        converted: getStats(convertedText)
      },
      characterMappings: Object.keys(arabicToKurdishMap).length
    }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadAsCSV = (originalText, convertedText, filename = 'arabic-kurdish-conversion') => {
  const originalWords = originalText.split(/\s+/).filter(w => w.trim())
  const convertedWords = convertedText.split(/\s+/).filter(w => w.trim())
  
  let csvContent = 'Index,Original Arabic,Converted Kurdish,Character Count Original,Character Count Converted\n'
  
  const maxLength = Math.max(originalWords.length, convertedWords.length)
  for (let i = 0; i < maxLength; i++) {
    const orig = originalWords[i] || ''
    const conv = convertedWords[i] || ''
    csvContent += `${i + 1},"${orig}","${conv}",${orig.length},${conv.length}\n`
  }
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadAsExcel = (originalText, convertedText, filename = 'arabic-kurdish-conversion') => {
  // Simple XML format that Excel can read
  const originalWords = originalText.split(/\s+/).filter(w => w.trim())
  const convertedWords = convertedText.split(/\s+/).filter(w => w.trim())
  
  let xmlContent = `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<Worksheet ss:Name="Arabic to Kurdish Conversion">
<Table>
<Row>
<Cell><Data ss:Type="String">Index</Data></Cell>
<Cell><Data ss:Type="String">Original Arabic</Data></Cell>
<Cell><Data ss:Type="String">Converted Kurdish</Data></Cell>
<Cell><Data ss:Type="String">Character Count Original</Data></Cell>
<Cell><Data ss:Type="String">Character Count Converted</Data></Cell>
</Row>`

  const maxLength = Math.max(originalWords.length, convertedWords.length)
  for (let i = 0; i < maxLength; i++) {
    const orig = originalWords[i] || ''
    const conv = convertedWords[i] || ''
    xmlContent += `
<Row>
<Cell><Data ss:Type="Number">${i + 1}</Data></Cell>
<Cell><Data ss:Type="String">${orig}</Data></Cell>
<Cell><Data ss:Type="String">${conv}</Data></Cell>
<Cell><Data ss:Type="Number">${orig.length}</Data></Cell>
<Cell><Data ss:Type="Number">${conv.length}</Data></Cell>
</Row>`
  }

  xmlContent += `
</Table>
</Worksheet>
</Workbook>`

  const blob = new Blob([xmlContent], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.xls`
  a.click()
  URL.revokeObjectURL(url)
}

export default function ArabicToKurdishConverter() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)
  const [fontSize, setFontSize] = useState('text-lg')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [showMapping, setShowMapping] = useState(true)
  const [conversionHistory, setConversionHistory] = useState([])
  const [realtimeEnabled, setRealtimeEnabled] = useState(true)
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  // Real-time conversion effect
  useEffect(() => {
    if (realtimeEnabled && inputText) {
      const converted = convertArabicToKurdish(inputText)
      setOutputText(converted)
      
      // Add to history if text is substantial
      if (inputText.trim().length > 5) {
        const timestamp = new Date().toLocaleString()
        setConversionHistory(prev => {
          const newEntry = { id: Date.now(), original: inputText, converted, timestamp }
          return [newEntry, ...prev.slice(0, 9)] // Keep last 10 entries
        })
      }
    } else if (!inputText) {
      setOutputText('')
    }
  }, [inputText, realtimeEnabled])

  const handleManualConvert = () => {
    const converted = convertArabicToKurdish(inputText)
    setOutputText(converted)
  }

  const handleCopy = async (text = outputText) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
  }

  const loadSampleText = (sample) => {
    setInputText(sample.arabic)
  }

  const inputStats = getStats(inputText)
  const outputStats = getStats(outputText)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-4`}>
      <div className={`container max-w-6xl mx-auto py-8 ${isFullScreen ? 'max-w-full' : ''}`}>
        
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Arabic to Kurdish Converter Pro
            </h1>
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </div>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Professional Arabic to Kurdish converter with real-time conversion, advanced features, and multiple export formats.
          </p>
        </div>

        {/* Control Panel */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
              <Settings className="h-5 w-5" />
              Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              {/* Font Size Control */}
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-sm">Small</SelectItem>
                    <SelectItem value="text-base">Medium</SelectItem>
                    <SelectItem value="text-lg">Large</SelectItem>
                    <SelectItem value="text-xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Real-time Toggle */}
              <Button
                variant={realtimeEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setRealtimeEnabled(!realtimeEnabled)}
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                {realtimeEnabled ? 'Real-time ON' : 'Real-time OFF'}
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDarkMode ? 'Light' : 'Dark'}
              </Button>

              {/* Full Screen Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="flex items-center gap-2"
              >
                {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                {isFullScreen ? 'Exit Full' : 'Full Screen'}
              </Button>

              {/* Toggle Stats */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="flex items-center gap-2"
              >
                {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                Stats
              </Button>

              {/* Toggle Mapping */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMapping(!showMapping)}
                className="flex items-center gap-2"
              >
                {showMapping ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                Mapping
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Texts */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
              <BookOpen className="h-5 w-5" />
              Quick Test Samples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {sampleTexts.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => loadSampleText(sample)}
                >
                  <div className="font-semibold text-sm">{sample.name}</div>
                  <div className={`text-xs opacity-70 text-right ${fontSize}`} dir="rtl" style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}>
                    {sample.arabic.substring(0, 30)}...
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{sample.description}</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Converter */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input Section */}
          <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardHeader>
              <CardTitle className={`flex items-center justify-between ${isDarkMode ? 'text-white' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="text-right">العربية</span>
                  <span className="text-sm text-gray-500">Arabic Input</span>
                </div>
                <Badge variant="outline">{inputStats.chars} chars</Badge>
              </CardTitle>
              <CardDescription>
                {realtimeEnabled ? 'Type Arabic text for instant conversion' : 'Type Arabic text and click convert'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={inputRef}
                placeholder="اكتب أو الصق النص العربي هنا..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`min-h-[250px] ${fontSize} leading-relaxed ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
                dir="rtl"
                style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}
              />
              
              {showStats && (
                <div className="grid grid-cols-2 gap-4 mt-4 p-3 bg-muted rounded">
                  <div className="text-sm">
                    <Hash className="h-4 w-4 inline mr-1" />
                    Characters: {inputStats.chars}
                  </div>
                  <div className="text-sm">
                    Words: {inputStats.words}
                  </div>
                  <div className="text-sm">
                    Lines: {inputStats.lines}
                  </div>
                  <div className="text-sm">
                    Arabic chars: {inputStats.arabicChars}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  {!realtimeEnabled && (
                    <Button 
                      onClick={handleManualConvert}
                      disabled={!inputText}
                      size="sm"
                    >
                      Convert
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleClear}
                    disabled={!inputText}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardHeader>
              <CardTitle className={`flex items-center justify-between ${isDarkMode ? 'text-white' : ''}`}>
                <div className="flex items-center gap-2">
                  <span>Kurdish Output</span>
                  <span className="text-sm text-gray-500">کوردی</span>
                </div>
                <Badge variant="outline">{outputStats.chars} chars</Badge>
              </CardTitle>
              <CardDescription>
                {realtimeEnabled ? 'Converted text appears instantly' : 'Click convert to see Kurdish text'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={outputRef}
                placeholder="Converted Kurdish text will appear here..."
                value={outputText}
                readOnly
                className={`min-h-[250px] ${fontSize} leading-relaxed ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                dir="ltr"
                style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}
              />
              
              {showStats && (
                <div className="grid grid-cols-2 gap-4 mt-4 p-3 bg-muted rounded">
                  <div className="text-sm">
                    <Hash className="h-4 w-4 inline mr-1" />
                    Characters: {outputStats.chars}
                  </div>
                  <div className="text-sm">
                    Words: {outputStats.words}
                  </div>
                  <div className="text-sm">
                    Lines: {outputStats.lines}
                  </div>
                  <div className="text-sm">
                    Kurdish chars: {outputStats.arabicChars}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCopy()}
                  disabled={!outputText}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                
                {/* Download Options */}
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadAsText(inputText, outputText)}
                    disabled={!outputText}
                    title="Download as TXT"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadAsJSON(inputText, outputText)}
                    disabled={!outputText}
                    title="Download as JSON"
                  >
                    <Database className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadAsCSV(inputText, outputText)}
                    disabled={!outputText}
                    title="Download as CSV"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadAsExcel(inputText, outputText)}
                    disabled={!outputText}
                    title="Download as Excel"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Additional Features */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Conversion History
            </TabsTrigger>
            <TabsTrigger value="mapping" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Character Mapping
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                  <Clock className="h-5 w-5" />
                  Recent Conversions
                </CardTitle>
                <CardDescription>Your last 10 conversions (auto-saved)</CardDescription>
              </CardHeader>
              <CardContent>
                {conversionHistory.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {conversionHistory.map((entry) => (
                      <div key={entry.id} className="p-3 border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Original (Arabic):</div>
                            <div className={`${fontSize} text-right`} dir="rtl" style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}>
                              {entry.original.substring(0, 100)}{entry.original.length > 100 ? '...' : ''}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Converted (Kurdish):</div>
                            <div className={`${fontSize}`}>
                              {entry.converted.substring(0, 100)}{entry.converted.length > 100 ? '...' : ''}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setInputText(entry.original)}
                            >
                              Load
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(entry.converted)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No conversions yet. Start typing in Arabic to see your conversion history here.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mapping">
            {showMapping && (
              <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`${isDarkMode ? 'text-white' : ''}`}>Enhanced Character Mapping Reference</CardTitle>
                  <CardDescription>
                    Complete mapping of {Object.keys(arabicToKurdishMap).length} Arabic to Kurdish characters (including new لاَ → ڵا mapping)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                    {Object.entries(arabicToKurdishMap).map(([arabic, kurdish]) => (
                      <div key={arabic} className={`flex items-center justify-between p-3 rounded border transition-all hover:shadow-md ${
                        ['لاَ', 'رِ', 'ىَ', 'لَ'].includes(arabic) ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      } ${isDarkMode ? 'bg-gray-700 border-gray-600' : ''}`}>
                        <span className="text-lg font-medium text-right" dir="rtl" style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}>
                          {arabic}
                        </span>
                        <div className="mx-2 text-gray-400">→</div>
                        <span className="text-lg font-medium" style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}>
                          {kurdish}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="text-sm font-medium text-blue-800 mb-2">Complex Diacritical Combinations:</div>
                    <div className="text-sm text-blue-700">
                      Blue highlighted mappings show complex patterns with diacritics that are processed first for accurate conversion.
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Enhanced Footer */}
        <div className={`text-center mt-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="mb-2">
            <strong>Arabic to Kurdish Converter Pro</strong> • Built with Next.js • 
            {Object.keys(arabicToKurdishMap).length} character mappings • Real-time conversion
          </p>
          <div className="flex justify-center items-center gap-4 text-sm">
            <span>Features: Real-time conversion • Multiple export formats • Conversion history • Dark mode</span>
          </div>
        </div>
      </div>
    </div>
  )
}