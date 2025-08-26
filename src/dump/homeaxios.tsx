
      // validation code start here
      if (!Package && !Medium) {
        setErrorMessage('Please Select Package And Medium Of Instructions.');
        toggleErrorModal();
        return;
      }
    

      if (!Package) {
        setErrorMessage('Please Select Package.');
        toggleErrorModal();
        return;
      }
  
      if (!Medium) {
        setErrorMessage('Please Select Medium Of Instructions.');
        toggleErrorModal();
        return;
      }
        //validation code end here ...........
        setIsLoading(true);

        // axios request making 
        const apiUrl = 'https://lilaonmobile.rb-aai.in/LILAWebAPI/api/Home/getCaption/';

        const requestData = {
          LangSelected: Medium, // Assuming 'Medium' is the language selection
          // Add other data as needed
        };
    
        axios.post(apiUrl, requestData)
          .then((response) => {
            // Handle the response here
            //console.log('API Response:', response.data);
            setErrorMessage("Inside response "+response)
            if (Package === 'Prabodh' && Medium !== 'Medium') {
              // Navigate to the 'Home' component and pass data as params
              props.navigation.navigate('Home', {
                Package: Package,
                Medium: Medium,
                ApiResponse: response.data, // Pass the response data as a parameter
              });
            }
            else if (Package === 'Praveen' && Medium !== 'Medium') {
              // Navigate to the 'Homepraveen' component
              props.navigation.navigate('Homepraveen', {
                Package: Package,
                Medium: Medium,
                ApiResponse: response.data,
              });
            }
            else if (Package === 'Pragya'  && Medium !== 'Medium') {
              // Navigate to the 'Homepragya' component
              props.navigation.navigate('Homepragya', {
                Package: Package,
                Medium: Medium,
                ApiResponse: response.data,
              });
            }
            setIsLoading(false);

          })
          .catch((error) => {
            // Handle errors here
            console.error('API Error:', error);
            setErrorMessage(error);
            setIsLoading(false);

            
          
           // Show toast message
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error.message || 'An error occurred. Please try again.',
            });

          });
