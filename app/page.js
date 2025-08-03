'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, ArrowRight, Languages } from 'lucide-react'

// Character mapping for Arabic to Kurdish conversion
const arabicToKurdishMap = {
  // Complex diacritical combinations - process these first
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

// Conversion function
const convertArabicToKurdish = (text) => {
  if (!text) return ''
  
  let convertedText = text
  
  // First, handle complex diacritical combinations
  const complexPatterns = ['رِ', 'ىَ', 'لَ']
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

export default function ArabicToKurdishConverter() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)

  const handleConvert = () => {
    const converted = convertArabicToKurdish(inputText)
    setOutputText(converted)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Arabic to Kurdish Converter
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert Arabic text to Kurdish script with proper character mapping and formatting. 
            Simply paste your Arabic text and click convert.
          </p>
        </div>

        {/* Main Converter */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-right">العربية</span>
                <span className="text-sm text-gray-500">Arabic Input</span>
              </CardTitle>
              <CardDescription>
                Paste your Arabic text here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="اكتب أو الصق النص العربي هنا..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] text-right text-lg leading-relaxed"
                dir="rtl"
                style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {inputText.length} characters
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClear}
                  disabled={!inputText}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Kurdish Output</span>
                <span className="text-sm text-gray-500">کوردی</span>
              </CardTitle>
              <CardDescription>
                Converted Kurdish text will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Converted Kurdish text will appear here..."
                value={outputText}
                readOnly
                className="min-h-[200px] text-left text-lg leading-relaxed bg-gray-50"
                dir="ltr"
                style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {outputText.length} characters
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Convert Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={handleConvert}
            disabled={!inputText.trim()}
            size="lg"
            className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Convert to Kurdish
          </Button>
        </div>

        {/* Character Mapping Reference */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Character Mapping Reference</CardTitle>
            <CardDescription>
              Complete mapping of Arabic to Kurdish characters used in conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(arabicToKurdishMap).map(([arabic, kurdish]) => (
                <div key={arabic} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <span className="text-lg font-medium text-right" dir="rtl">{arabic}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                  <span className="text-lg font-medium">{kurdish}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Built with Next.js • Supports all standard Arabic to Kurdish character conversions</p>
        </div>
      </div>
    </div>
  )
}