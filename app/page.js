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
  Eye, EyeOff, Hash, Clock, Star, Layers3
} from 'lucide-react'

// ORIGINAL Arabic to Kurdish mapping (Pro version)
const arabicToKurdishProMap = {
  // Complex diacritical combinations - process these first
  'لاَ': 'ڵا',
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

// NEW Arabic to Kurdish (Standard) mapping
const arabicToKurdishStandardMap = {
  // Complex diacritical combinations - process these first
  'لاَ': 'ڵا',
  'رِ': 'ڕ',
  'ىَ': 'ێ', 
  'لَ': 'ڵ',
  
  // Simple character mappings (Standard version)
  'ث': 'س',  // Changed from پ
  'ق': 'ق',
  'ف': 'ف',
  'غ': 'غ',
  'ع': 'ع',
  'ه': 'ه',
  'خ': 'خ',
  'ح': 'ح',
  'ج': 'ج',
  'د': 'د',
  'ط': 'ت',  // Changed from گ
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
  'ء': 'ئ',  // Changed from و
  'ؤ': 'ۆ',
  'ر': 'ر',
  'لا': 'لا',
  'ى': 'ی',
  'ة': 'ە',
  'و': 'و',
  'ز': 'ز',
  'ظ': 'ز'   // Changed from ڤ
}

// Sample texts for testing both versions
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
    name: "Difference Test",
    arabic: "ث ط ء ظ هذه الحروف تختلف",
    description: "Test characters that differ between Pro and Standard"
  },
  {
    name: "Long Sentence",
    arabic: "هذا نص طويل باللغة العربية يحتوي على كلمات مختلفة وحروف متنوعة لاختبار التحويل",
    description: "Long Arabic sentence for comprehensive testing"
  }
]

// Enhanced conversion function
const convertArabicToKurdish = (text, mappingType = 'pro') => {
  if (!text) return ''
  
  const mapping = mappingType === 'standard' ? arabicToKurdishStandardMap : arabicToKurdishProMap
  let convertedText = text
  
  // First, handle complex diacritical combinations
  const complexPatterns = ['لاَ', 'رِ', 'ىَ', 'لَ']
  complexPatterns.forEach(pattern => {
    if (mapping[pattern]) {
      const regex = new RegExp(pattern, 'g')
      convertedText = convertedText.replace(regex, mapping[pattern])
    }
  })
  
  // Then handle simple character mappings
  convertedText = convertedText.split('').map(char => {
    return mapping[char] || char
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
const downloadAsText = (originalText, convertedText, mappingType, filename = 'arabic-kurdish-conversion') => {
  const versionLabel = mappingType === 'standard' ? 'Standard' : 'Pro'
  const content = `Arabic to Kurdish Conversion (${versionLabel})\n${'='.repeat(60)}\n\nOriginal Arabic Text:\n${originalText}\n\nConverted Kurdish Text:\n${convertedText}\n\nMapping Version: ${versionLabel}\nGenerated on: ${new Date().toLocaleString()}`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}-${mappingType}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadAsJSON = (originalText, convertedText, mappingType, filename = 'arabic-kurdish-conversion') => {
  const versionLabel = mappingType === 'standard' ? 'Standard' : 'Pro'
  const mapping = mappingType === 'standard' ? arabicToKurdishStandardMap : arabicToKurdishProMap
  const data = {
    conversion: {
      original: originalText,
      converted: convertedText,
      mappingType: versionLabel,
      timestamp: new Date().toISOString(),
      stats: {
        original: getStats(originalText),
        converted: getStats(convertedText)
      },
      characterMappings: Object.keys(mapping).length
    }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}-${mappingType}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadAsCSV = (originalText, convertedText, mappingType, filename = 'arabic-kurdish-conversion') => {
  const originalWords = originalText.split(/\s+/).filter(w => w.trim())
  const convertedWords = convertedText.split(/\s+/).filter(w => w.trim())
  const versionLabel = mappingType === 'standard' ? 'Standard' : 'Pro'
  
  let csvContent = `Index,Original Arabic,Converted Kurdish,Character Count Original,Character Count Converted,Mapping Type\n`
  
  const maxLength = Math.max(originalWords.length, convertedWords.length)
  for (let i = 0; i < maxLength; i++) {
    const orig = originalWords[i] || ''
    const conv = convertedWords[i] || ''
    csvContent += `${i + 1},"${orig}","${conv}",${orig.length},${conv.length},"${versionLabel}"\n`
  }
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}-${mappingType}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadAsExcel = (originalText, convertedText, mappingType, filename = 'arabic-kurdish-conversion') => {
  const originalWords = originalText.split(/\s+/).filter(w => w.trim())
  const convertedWords = convertedText.split(/\s+/).filter(w => w.trim())
  const versionLabel = mappingType === 'standard' ? 'Standard' : 'Pro'
  
  let xmlContent = `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<Worksheet ss:Name="Arabic to Kurdish Conversion ${versionLabel}">
<Table>
<Row>
<Cell><Data ss:Type="String">Index</Data></Cell>
<Cell><Data ss:Type="String">Original Arabic</Data></Cell>
<Cell><Data ss:Type="String">Converted Kurdish</Data></Cell>
<Cell><Data ss:Type="String">Character Count Original</Data></Cell>
<Cell><Data ss:Type="String">Character Count Converted</Data></Cell>
<Cell><Data ss:Type="String">Mapping Type</Data></Cell>
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
<Cell><Data ss:Type="String">${versionLabel}</Data></Cell>
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
  a.download = `${filename}-${mappingType}.xls`
  a.click()
  URL.revokeObjectURL(url)
}

// Converter Component
const ConverterSection = ({ 
  title, 
  badge, 
  description, 
  mappingType, 
  inputText, 
  setInputText, 
  outputText, 
  setOutputText, 
  fontSize, 
  isDarkMode, 
  showStats, 
  realtimeEnabled, 
  conversionHistory, 
  setConversionHistory,
  characterMapping 
}) => {
  const [copied, setCopied] = useState(false)

  // Real-time conversion effect
  useEffect(() => {
    if (realtimeEnabled && inputText) {
      const converted = convertArabicToKurdish(inputText, mappingType)
      setOutputText(converted)
      
      // Add to history if text is substantial
      if (inputText.trim().length > 5) {
        const timestamp = new Date().toLocaleString()
        setConversionHistory(prev => {
          const newEntry = { id: Date.now(), original: inputText, converted, timestamp, mappingType }
          return [newEntry, ...prev.slice(0, 9)] // Keep last 10 entries
        })
      }
    } else if (!inputText) {
      setOutputText('')
    }
  }, [inputText, realtimeEnabled, mappingType, setOutputText, setConversionHistory])

  const handleManualConvert = () => {
    const converted = convertArabicToKurdish(inputText, mappingType)
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
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          {badge && <Badge variant="secondary" className="ml-2">{badge}</Badge>}
        </div>
        <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {/* Sample Texts */}
              <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
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
                  {sample.arabic.substring(0, 30)}{sample.arabic.length > 30 ? '...' : ''}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{sample.description}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Converter */}
      <div className="grid md:grid-cols-2 gap-6">
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
              placeholder="اكتب أو الصق النص العربي هنا..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`min-h-[200px] ${fontSize} leading-relaxed ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
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
              placeholder="Converted Kurdish text will appear here..."
              value={outputText}
              readOnly
              className={`min-h-[200px] ${fontSize} leading-relaxed ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
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
                  onClick={() => downloadAsText(inputText, outputText, mappingType)}
                  disabled={!outputText}
                  title="Download as TXT"
                >
                  <FileText className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadAsJSON(inputText, outputText, mappingType)}
                  disabled={!outputText}
                  title="Download as JSON"
                >
                  <Database className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadAsCSV(inputText, outputText, mappingType)}
                  disabled={!outputText}
                  title="Download as CSV"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadAsExcel(inputText, outputText, mappingType)}
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

      {/* Character Mapping Reference */}
      <Card className={`shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle className={`${isDarkMode ? 'text-white' : ''}`}>
            Character Mapping Reference ({mappingType === 'standard' ? 'Standard' : 'Pro'})
          </CardTitle>
          <CardDescription>
            Complete mapping of {Object.keys(characterMapping).length} Arabic to Kurdish characters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {Object.entries(characterMapping).map(([arabic, kurdish]) => (
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
    </div>
  )
}

export default function ArabicToKurdishConverter() {
  // Pro version state
  const [proInputText, setProInputText] = useState('')
  const [proOutputText, setProOutputText] = useState('')
  
  // Standard version state
  const [standardInputText, setStandardInputText] = useState('')
  const [standardOutputText, setStandardOutputText] = useState('')
  
  // Global settings
  const [fontSize, setFontSize] = useState('text-lg')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [showMapping, setShowMapping] = useState(true)
  const [realtimeEnabled, setRealtimeEnabled] = useState(true)
  
  // Combined history for both converters
  const [conversionHistory, setConversionHistory] = useState([])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-4`}>
      <div className={`container max-w-7xl mx-auto py-8 ${isFullScreen ? 'max-w-full' : ''}`}>
        
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Arabic to Kurdish Converter Suite
            </h1>
            <Badge variant="secondary" className="ml-2 text-lg px-3 py-1">
              <Layers3 className="h-4 w-4 mr-1" />
              Dual Mode
            </Badge>
          </div>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Professional Arabic to Kurdish conversion suite with two distinct mapping systems: Pro and Standard versions with real-time conversion, advanced features, and multiple export formats.
          </p>
        </div>

        {/* Global Control Panel */}
        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
              <Settings className="h-5 w-5" />
              Global Control Panel
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

        {/* Main Converter Tabs */}
        <Tabs defaultValue="pro" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pro" className="flex items-center gap-2 text-lg py-3">
              <Star className="h-5 w-5" />
              Arabic to Kurdish (Pro)
            </TabsTrigger>
            <TabsTrigger value="standard" className="flex items-center gap-2 text-lg py-3">
              <Languages className="h-5 w-5" />
              Arabic to Kurdish (Standard)
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 text-lg py-3">
              <History className="h-5 w-5" />
              Conversion History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pro">
            <ConverterSection
              title="Arabic to Kurdish (Pro)"
              badge={<><Zap className="h-3 w-3 mr-1" />Real-time</>}
              description="Advanced Arabic to Kurdish converter with enhanced character mappings including چ, پ, گ, ڤ for comprehensive text conversion."
              mappingType="pro"
              inputText={proInputText}
              setInputText={setProInputText}
              outputText={proOutputText}
              setOutputText={setProOutputText}
              fontSize={fontSize}
              isDarkMode={isDarkMode}
              showStats={showStats}
              realtimeEnabled={realtimeEnabled}
              conversionHistory={conversionHistory}
              setConversionHistory={setConversionHistory}
              characterMapping={arabicToKurdishProMap}
            />
          </TabsContent>
          
          <TabsContent value="standard">
            <ConverterSection
              title="Arabic to Kurdish (Standard)"
              badge={<><Languages className="h-3 w-3 mr-1" />Standard</>}
              description="Standard Arabic to Kurdish converter with traditional character mappings optimized for formal and academic texts."
              mappingType="standard"
              inputText={standardInputText}
              setInputText={setStandardInputText}
              outputText={standardOutputText}
              setOutputText={setStandardOutputText}
              fontSize={fontSize}
              isDarkMode={isDarkMode}
              showStats={showStats}
              realtimeEnabled={realtimeEnabled}
              conversionHistory={conversionHistory}
              setConversionHistory={setConversionHistory}
              characterMapping={arabicToKurdishStandardMap}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                  <Clock className="h-5 w-5" />
                  Combined Conversion History
                </CardTitle>
                <CardDescription>Your recent conversions from both Pro and Standard converters (auto-saved)</CardDescription>
              </CardHeader>
              <CardContent>
                                  {conversionHistory.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                          {conversionHistory.map((entry) => (
                        <div key={entry.id} className={`p-4 border rounded-lg ${isDarkMode ? 'border-gray-600' : ''}`}>
                        <div className="flex justify-between items-center mb-3">
                          <Badge variant={entry.mappingType === 'standard' ? 'secondary' : 'default'}>
                            {entry.mappingType === 'standard' ? 'Standard' : 'Pro'} Version
                          </Badge>
                          <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-2">Original (Arabic):</div>
                            <div className={`${fontSize} text-right p-2 bg-muted rounded`} dir="rtl" style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}>
                              {entry.original.substring(0, 150)}{entry.original.length > 150 ? '...' : ''}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-2">Converted (Kurdish):</div>
                            <div className={`${fontSize} p-2 bg-muted rounded`}>
                              {entry.converted.substring(0, 150)}{entry.converted.length > 150 ? '...' : ''}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            <span>{getStats(entry.original).chars} chars</span>
                            <span>•</span>
                            <span>{getStats(entry.original).words} words</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (entry.mappingType === 'standard') {
                                  setStandardInputText(entry.original)
                                } else {
                                  setProInputText(entry.original)
                                }
                              }}
                            >
                              Load
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigator.clipboard.writeText(entry.converted)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No conversions yet</p>
                    <p>Start typing in Arabic in either converter to see your conversion history here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Footer */}
        <div className={`text-center mt-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="mb-3 text-lg">
            <strong>Arabic to Kurdish Converter Suite</strong> • Built with Next.js
          </p>
          <div className="flex justify-center items-center gap-6 text-sm flex-wrap">
            <span><strong>Pro Version:</strong> {Object.keys(arabicToKurdishProMap).length} mappings</span>
            <span><strong>Standard Version:</strong> {Object.keys(arabicToKurdishStandardMap).length} mappings</span>
            <span><strong>Features:</strong> Real-time • Multi-format export • History tracking • Dark mode</span>
          </div>
        </div>
      </div>
    </div>
  )
}