import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardList, AlertTriangle, CheckCircle, Info, Calendar, FileText } from 'lucide-react';

const Assessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const assessments = [
    {
      id: 'phq9',
      name: 'PHQ-9 Depression Screening',
      description: 'A 9-question screening tool to assess depression symptoms over the past two weeks.',
      duration: '3-5 minutes',
      type: 'Depression',
      color: 'bg-purple-100 text-purple-800',
      questions: [
        'Little interest or pleasure in doing things',
        'Feeling down, depressed, or hopeless',
        'Trouble falling or staying asleep, or sleeping too much',
        'Feeling tired or having little energy',
        'Poor appetite or overeating',
        'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
        'Trouble concentrating on things, such as reading the newspaper or watching television',
        'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
        'Thoughts that you would be better off dead, or of hurting yourself'
      ],
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'gad7',
      name: 'GAD-7 Anxiety Screening',
      description: 'A 7-question screening tool to assess anxiety symptoms over the past two weeks.',
      duration: '2-4 minutes',
      type: 'Anxiety',
      color: 'bg-red-100 text-red-800',
      questions: [
        'Feeling nervous, anxious, or on edge',
        'Not being able to stop or control worrying',
        'Worrying too much about different things',
        'Trouble relaxing',
        'Being so restless that it is hard to sit still',
        'Becoming easily annoyed or irritable',
        'Feeling afraid, as if something awful might happen'
      ],
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'stress',
      name: 'Academic Stress Assessment',
      description: 'Evaluate your current level of academic stress and its impact on your daily life.',
      duration: '5-7 minutes',
      type: 'Stress',
      color: 'bg-orange-100 text-orange-800',
      questions: [
        'I feel overwhelmed by my academic workload',
        'I worry about my academic performance',
        'I have trouble sleeping due to academic concerns',
        'I feel pressure to achieve perfect grades',
        'Academic stress affects my relationships',
        'I avoid social activities due to study pressure',
        'I feel anxious about upcoming exams or assignments',
        'I compare my performance to other students',
        'I feel like I\'m not meeting expectations',
        'Academic stress affects my physical health'
      ],
      options: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' },
        { value: 4, label: 'Always' }
      ]
    }
  ];

  const handleAnswerSelect = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value
    });
  };

  const handleNext = () => {
    if (currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxScore = selectedAssessment.questions.length * (selectedAssessment.options.length - 1);
    
    let severity, recommendation, riskLevel;

    if (selectedAssessment.id === 'phq9') {
      if (totalScore <= 4) {
        severity = 'Minimal Depression';
        recommendation = 'Your responses suggest minimal depression symptoms. Continue with healthy lifestyle practices.';
        riskLevel = 'low';
      } else if (totalScore <= 9) {
        severity = 'Mild Depression';
        recommendation = 'Your responses suggest mild depression symptoms. Consider speaking with a counselor for support.';
        riskLevel = 'medium';
      } else if (totalScore <= 14) {
        severity = 'Moderate Depression';
        recommendation = 'Your responses suggest moderate depression symptoms. We recommend scheduling a counseling session.';
        riskLevel = 'high';
      } else if (totalScore <= 19) {
        severity = 'Moderately Severe Depression';
        recommendation = 'Your responses suggest moderately severe depression. Please schedule a counseling session soon.';
        riskLevel = 'high';
      } else {
        severity = 'Severe Depression';
        recommendation = 'Your responses suggest severe depression symptoms. Please seek immediate professional help.';
        riskLevel = 'crisis';
      }
    } else if (selectedAssessment.id === 'gad7') {
      if (totalScore <= 4) {
        severity = 'Minimal Anxiety';
        recommendation = 'Your responses suggest minimal anxiety symptoms. Continue with stress management practices.';
        riskLevel = 'low';
      } else if (totalScore <= 9) {
        severity = 'Mild Anxiety';
        recommendation = 'Your responses suggest mild anxiety symptoms. Consider learning anxiety management techniques.';
        riskLevel = 'medium';
      } else if (totalScore <= 14) {
        severity = 'Moderate Anxiety';
        recommendation = 'Your responses suggest moderate anxiety symptoms. We recommend speaking with a counselor.';
        riskLevel = 'high';
      } else {
        severity = 'Severe Anxiety';
        recommendation = 'Your responses suggest severe anxiety symptoms. Please seek professional support.';
        riskLevel = 'high';
      }
    } else {
      const percentage = (totalScore / maxScore) * 100;
      if (percentage <= 25) {
        severity = 'Low Stress';
        recommendation = 'Your stress levels appear manageable. Keep up your current coping strategies.';
        riskLevel = 'low';
      } else if (percentage <= 50) {
        severity = 'Moderate Stress';
        recommendation = 'You\'re experiencing moderate stress. Consider stress management techniques and resources.';
        riskLevel = 'medium';
      } else if (percentage <= 75) {
        severity = 'High Stress';
        recommendation = 'You\'re experiencing high stress levels. We recommend seeking support and counseling.';
        riskLevel = 'high';
      } else {
        severity = 'Very High Stress';
        recommendation = 'You\'re experiencing very high stress levels. Please consider immediate support and counseling.';
        riskLevel = 'high';
      }
    }

    setResults({
      score: totalScore,
      maxScore,
      severity,
      recommendation,
      riskLevel,
      percentage: Math.round((totalScore / maxScore) * 100)
    });
    setShowResults(true);
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'crisis': return 'bg-red-100 border-red-300 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <button onClick={resetAssessment} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Assessment Results</h1>
                  <p className="text-sm text-gray-600">{selectedAssessment.name}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {results.riskLevel === 'crisis' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Immediate Support Recommended</h3>
                  <p className="text-red-700 mb-4">
                    Your responses indicate you may be experiencing significant distress. Please reach out for immediate support.
                  </p>
                  <div className="space-y-2">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors mr-3">
                      Call Crisis Hotline: 1-800-CRISIS
                    </button>
                    <Link to="/booking" className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors inline-block">
                      Schedule Emergency Session
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete</h2>
              <p className="text-gray-600">Here are your results and personalized recommendations</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{results.score}/{results.maxScore}</div>
                <p className="text-gray-600">Total Score</p>
              </div>
              <div className="text-center">
                <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${getRiskColor(results.riskLevel)}`}>
                  {results.severity}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Personalized Recommendation</h3>
              <p className="text-gray-700">{results.recommendation}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Next Steps
                </h4>
                <ul className="space-y-2 text-blue-800 text-sm">
                  {results.riskLevel === 'low' ? (
                    <>
                      <li>• Continue current wellness practices</li>
                      <li>• Explore our resource library</li>
                      <li>• Consider joining peer support groups</li>
                    </>
                  ) : results.riskLevel === 'medium' ? (
                    <>
                      <li>• Schedule a counseling session</li>
                      <li>• Try our AI chat support</li>
                      <li>• Access coping strategy resources</li>
                    </>
                  ) : (
                    <>
                      <li>• Schedule counseling session immediately</li>
                      <li>• Contact crisis support if needed</li>
                      <li>• Inform a trusted friend or family member</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resources for You
                </h4>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Personalized coping strategies</li>
                  <li>• Relevant video and audio content</li>
                  <li>• Peer support discussions</li>
                  <li>• Professional counseling options</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Schedule Counseling
              </Link>
              <Link
                to="/resources"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
              >
                Explore Resources
              </Link>
              <Link
                to="/ai-chat"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
              >
                Chat with AI Support
              </Link>
              <button
                onClick={resetAssessment}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Take Another Assessment
              </button>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important Note:</p>
                  <p>
                    This assessment is a screening tool and not a diagnostic instrument. Results should be discussed with a qualified mental health professional for proper evaluation and treatment planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedAssessment) {
    const progress = ((currentQuestion + 1) / selectedAssessment.questions.length) * 100;
    const currentAnswer = answers[currentQuestion];

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <button onClick={resetAssessment} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{selectedAssessment.name}</h1>
                  <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {selectedAssessment.questions.length}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}% complete</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Over the last 2 weeks, how often have you been bothered by:
              </h2>
              <p className="text-lg text-gray-800 mb-6">
                {selectedAssessment.questions[currentQuestion]}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {selectedAssessment.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    currentAnswer === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      currentAnswer === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {currentAnswer === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentAnswer === undefined}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentQuestion === selectedAssessment.questions.length - 1 ? 'Complete Assessment' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to="/student" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mental Health Assessments</h1>
                <p className="text-sm text-gray-600">Evidence-based screening tools for self-assessment</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Information Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">About These Assessments</h3>
              <p className="text-blue-700 mb-4">
                These are standardized screening tools used by mental health professionals. They help identify symptoms and their severity, but are not diagnostic tools. Results should be discussed with a qualified counselor.
              </p>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• All responses are completely confidential and anonymous</li>
                <li>• Results are stored securely and only accessible to you</li>
                <li>• These tools are for screening purposes only, not diagnosis</li>
                <li>• Professional consultation is recommended for concerning results</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assessment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <ClipboardList className="h-6 w-6 text-gray-600" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${assessment.color}`}>
                      {assessment.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{assessment.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{assessment.description}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Duration:</span>
                  <span className="font-medium">{assessment.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Questions:</span>
                  <span className="font-medium">{assessment.questions.length}</span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedAssessment(assessment)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Assessment
              </button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Take Mental Health Assessments?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Early Detection</h4>
              <p className="text-gray-600 text-sm mb-4">
                Regular self-assessment helps identify mental health concerns early, when they're most treatable.
              </p>
              
              <h4 className="font-medium text-gray-900 mb-3">Track Progress</h4>
              <p className="text-gray-600 text-sm">
                Monitor your mental health over time and see how interventions and lifestyle changes affect your wellbeing.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Informed Conversations</h4>
              <p className="text-gray-600 text-sm mb-4">
                Assessment results provide a starting point for meaningful discussions with counselors and healthcare providers.
              </p>
              
              <h4 className="font-medium text-gray-900 mb-3">Personalized Support</h4>
              <p className="text-gray-600 text-sm">
                Results help match you with the most appropriate resources and support services for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;