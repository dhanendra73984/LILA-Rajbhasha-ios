import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

interface Lesson {
  HPreSentence: string;
  HAnswer: string;
  // Add more properties as needed
}

const Transform = (props: any) => {
  const {
    exerciseName,
    exerciseContent,
    ApiResponse,
    Package,
    Medium,
    selectedLessonIndex,
    index,
  } = props.route.params;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [suggestionIndex, setSuggestionIndex] = useState<number>(-1);
  const [showEnterAnswerMessage, setShowEnterAnswerMessage] = useState<boolean>(false);

  useEffect(() => {
    const makePostRequest = async () => {
      try {
        const response = await axios.post<Lesson[]>(
          'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getTransform/',
          {
            LangSelected: 'English',
            tablename: 'Prabodhth37Transform',
          }
        );

        setLessons(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    makePostRequest();
  }, []);

  const resetError = () => {
    setShowEnterAnswerMessage(false);
  };

 
  
  


  const suggestAnswer = () => {
    if (userAnswer.trim() === '') {
      setShowEnterAnswerMessage(true);
  
      // If the user didn't enter anything, show the correct answer word by word
      const answerWords = lessons[currentIndex].HAnswer.split(' ');
      const suggestedWord = answerWords[suggestionIndex] || '';
  
      setUserAnswer((prevAnswer) => {
        const updatedAnswer = prevAnswer + ' ' + suggestedWord;
        setSuggestionIndex((prevIndex) => prevIndex + 1);
        return updatedAnswer.trim();
      });
  
      return;
    }
    setShowEnterAnswerMessage(false);
  
    if (lessons.length > 0) {
      const answerWords = lessons[currentIndex].HAnswer.split(' ');
  
      // Handle the initial case where suggestionIndex is -1
      if (suggestionIndex === -1) {
        setSuggestionIndex(0);
      } else if (suggestionIndex < answerWords.length) {
        setUserAnswer((prevAnswer) => {
          // If user enters wrong data, replace it with the correct answer word by word
          const userAnswerWords = prevAnswer.split(' ');
          const updatedAnswerWords = userAnswerWords.map((word, index) =>
            index === suggestionIndex && word !== answerWords[suggestionIndex] ? answerWords[suggestionIndex] : word
          );
  
          const updatedAnswer = updatedAnswerWords.join(' ');
  
          setSuggestionIndex((prevIndex) => prevIndex + 1);
          return updatedAnswer.trim(); // Remove leading/trailing spaces
        });
      } else {
        // Handle the case when there are no more suggestions
        console.log('No more suggestions');
      }
    }
  };

  const getDisplayedSuggestions = () => {
    if (lessons.length > 0 && suggestionIndex >= 0) {
      const answerWords = lessons[currentIndex].HAnswer.split(' ');
  
      // Check if there are more suggestions
      if (suggestionIndex < answerWords.length) {
        const currentWord = answerWords[suggestionIndex];
        const previousWord = answerWords[suggestionIndex - 1] || ''; // Use an empty string if no previous word
        return `${previousWord} ${currentWord}`;
      } else {
        // No more suggestions
        return '';
      }
    }
  
    // Handle the case when lessons array is empty or suggestionIndex is -1
    return '';
  };

  const showCorrectAnswer = () => {
    if (userAnswer.trim() === '') {
      setShowEnterAnswerMessage(true);
    } else {
      setUserAnswer(lessons[currentIndex].HAnswer);
      setShowEnterAnswerMessage(false);
    }
  };

  const [answerResult, setAnswerResult] = useState<string>('');



  //.....

  useEffect(() => {
    // Reset answerResult when navigating to the next or previous lesson
    setAnswerResult('');
  }, [currentIndex]);

  const showPrevLesson = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer('');
      setSuggestionIndex(-1);
      resetError();
    }
  };

  const showNextLesson = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setSuggestionIndex(-1);
      resetError();
    }
  };

  const checkAnswer = () => {
    if (userAnswer.trim() === '') {
      setShowEnterAnswerMessage(true);
      setAnswerResult('');
    } else {
      setShowEnterAnswerMessage(false);
      const isCorrect = userAnswer.trim() === lessons[currentIndex].HAnswer.trim();
      setAnswerResult(isCorrect ? 'Correct Answer!' : 'Incorrect Answer!');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transform</Text>

      {lessons.length > 0 && (
        <View>
          <Text>{lessons[currentIndex].HPreSentence}</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your answer here"
            value={userAnswer}
            onChangeText={(text) => setUserAnswer(text)}
          />
        </View>
      )}

      {showEnterAnswerMessage && (
        <Text>Please enter your answer first.</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={suggestAnswer} disabled={suggestionIndex >= lessons[currentIndex]?.HAnswer.split(' ').length}>
          <Text style={styles.button}>Get Suggestion</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showCorrectAnswer}>
          <Text style={styles.button}>Show Correct</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={checkAnswer}>
          <Text style={styles.button}>Check</Text>
          
        </TouchableOpacity>

        {answerResult !== '' && (
        <Text style={{ marginTop: 16, fontWeight: 'bold' }}>
          {answerResult === 'Correct Answer!' ? 'Your answer is correct.' : 'Your answer is incorrect.'}
        </Text>
      )}

      

      <View style={styles.suggestionsContainer}>
        <Text>{getDisplayedSuggestions()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => { showPrevLesson(); resetError(); }}>
          <Text style={styles.button}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { showNextLesson(); resetError(); }}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  suggestionButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: 8,
    marginTop: 16,
  },
  suggestionsContainer: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 8,
    backgroundColor: 'blue',
    color: 'white',
  },
  // Add more styles as needed
});

export default Transform;
