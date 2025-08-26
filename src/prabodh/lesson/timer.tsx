const [remainingTime, setRemainingTime] = useState<number>(120); // 2 minutes in seconds
useEffect(() => {
    // Set up an interval to decrement the remaining time every second
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          // If time is up, navigate to the next screen or handle it as needed
          clearInterval(intervalId);
          // Additional logic or navigation here
          props.navigation.navigate('Testprabodh'); // Replace 'TimeUpScreen' with the screen you want to navigate to
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [navigation]);
  <Text>Remaining Time: {Math.floor(remainingTime / 60)}:{remainingTime % 60}</Text>