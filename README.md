# Interactive JavaScript Dashboard
## Belly Button Biodiversity
**Click [here](https://larsonki.github.io/belly-button-challenge/) to access the visualizations of belly button data.**

### The Dashboard
This interactive dashboard explores the biodiversity of belly buttons based on data collected by Dan Fergus and Sarah Council. The study they conducted included 153 test subjects and revealed a handful of microbial species (referred to as operational taxonomic units, or OTUs) were present in more than 70% of people.

The dashboard includes an informational box for each participant of the study as well as three visuals. The information on the page automatically updates based off the ID number of the test subject selected.

The three visuals include:
- A Bar Chart
  - Displaying the top 10 OTUs found in the individual test subject
- A Belly Button Washing Frequency Gauge
  - Showing many times in a week the test subject washed their belly button
- A Bubble Chart
  - Displaying the frequency of the OTU found in samples -- the more samples, the larger the bubble

### The Code
The steps taken to create the dashboard are as follows:
1. Created a constant for the URL to the data to call on later in functions.
2. Created an outline of the necessary functions, which include:
   1. An Initialize Function which called on the URL and also appended the test subject information to the interactive drop-down.
   2. A Build Demographic Info Function which appended the demographic info from the URL and appended it to the box based on the selected test subject.
   3. A Build Charts Function which again referenced info from the URL and built the two charts and gauge based on the selected test subject.
   4. An Option Changed Function which called back to the two build functions and directed them to re-run whenever the selected test subject changed.

Source Data: [Belly Button Biodiversity Dataset](http://robdunnlab.com/projects/belly-button-biodiversity/)