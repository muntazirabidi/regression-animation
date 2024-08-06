import React from 'react';

const RegressionExplanation = () => {
  return (
    <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', fontSize: '14px' }}>
      <h3>Understanding Linear Regression</h3>
      
      <h4>What is Linear Regression?</h4>
      <p>
        Linear regression is a way to find a straight line that best fits a set of points. 
        Imagine you're trying to guess how tall a person will be based on their age. 
        Linear regression helps us draw the best "guess line" through our data points.
      </p>

      <h4>The Math Behind It</h4>
      <p>
        The line we're trying to find has this form: y = mx + b
        <br />
        Here, 'm' is the slope, and 'b' is the y-intercept.
        <br />
        - 'x' is our input (like age)
        <br />
        - 'y' is our prediction (like height)
      </p>

      <h4>Finding the Best Line</h4>
      <p>
        To find the best line, we:
        <br />
        1. Make a guess for m and b
        <br />
        2. See how far off our guesses are from the actual data points
        <br />
        3. Adjust m and b to make our guesses closer
        <br />
        4. Repeat until we can't get much closer
      </p>

      <h4>Measuring Error</h4>
      <p>
        We measure how good our line is by calculating the "error". 
        For each point, we:
        <br />
        1. Find the difference between our prediction and the actual y value
        <br />
        2. Square this difference (to make negatives positive)
        <br />
        3. Add up all these squared differences
        <br />
        4. Take the average (divide by the number of points)
        <br />
        This is called the "Mean Squared Error" (MSE).
      </p>

      <h4>Why It's Useful</h4>
      <p>
        Linear regression helps us:
        <br />
        - Make predictions (like guessing a person's height from their age)
        <br />
        - Understand relationships between things (does age really relate to height?)
        <br />
        - Make decisions based on data (should we make taller chairs for older kids?)
      </p>

      <h4>In Our Animation</h4>
      <p>
        Watch how the line moves to fit the points better. As it does, the error should get smaller. 
        Play with the noise to see how it affects how well we can fit a line!
      </p>
    </div>
  );
};

export default RegressionExplanation;