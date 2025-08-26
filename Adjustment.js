      
                       <Modal isVisible={isExitModalVisible}>
                      <View style={styles.modalContainer}>
                      <Text  style={{color:'black',fontSize:14}}>Do you want to close LILA App?</Text>
                      {/* <View style={styles.buttonContainer1}>
                      <Button title="     Yes     " color="#0D6EFD" onPress={() => handleExitConfirmation(true)} />
                    <Button title="     No     "  color="#0D6EFD" onPress={() => handleExitConfirmation(false)} />
                    </View> */}
                    <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleExitConfirmation(true)} style={styles.button}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleExitConfirmation(false)} style={styles.button}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                     </View>
              </View>
            </Modal>





            pickerBackground: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        width: '95%',
        height: 50, // ← Add this
        justifyContent: 'center', // ← Center Picker vertically
        elevation: 4,
        overflow: 'hidden', // ← Clip content (optional, helps for border)
      },


      <SafeAreaView style={{ backgroundColor: '#0D6EFD' }}>   </SafeAreaView>
      header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        backgroundColor: '#0D6EFD',
        paddingVertical: 12,  }