for genral vocabllery their is having object like this {
  "LangSelected": "English",   // Replace with the selected language
  "PackSelected": "Prabodh",    // Replace with the selected package
  "GenCategory": "Animal",  // Replace with the selected category
  "SectionName": "Words Meaning"           // Replace with the section name (if applicable)
}
in this GenCategory is just having data in English language so we have to make array of data like animal,bird .... for making api request we have 
that data with index from our preivios component Genralvbprabodhindex that which index is coming and which ibject has to be selected for sending to GenCategory
 const data = ['Animal','Bird','Body Part','Colour','Cardinal Number','Month','Flower','Fruit','Day','Musical Instrument','Places','Relation','Rivers','Season','Common Verbs'];
 indexofgencategory in wordmeanig is just indexces for animal=0,bird=1 like that 