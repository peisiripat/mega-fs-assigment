# Algo

## Requirements
python

homebrew

```bash
brew install python
```

## how to run algorithm

1. Go to terminal
2. cd into this folder (/algo)
3. To execute the algorithm use

```bash
"python3 algo.py"
```

4. then enter the prompt such as,

```bash
>please enter wordList: ["ab", "bc", "ab","cd"]
>please enter target: "abab"
```

note: currently support only single prompt,
to execute again, repeat step3 with a different prompt

## Discussion

### 1. Algorithm explanation
**1.1. Create word_dict** The word_dict is used to store [key, value] pairs of [unique words, indexes they appear at], we loop over the given wordList to initializa this dict.
**1.2. Create combinations** of target string pairs: We iterate over every possible combination in which the target string can be split into two parts.
**1.3. Finding word_dict pair** : Then, we use the word_dict to find the corresponding [unique words, indexes they appear at] pair which when appended, is equal to the given result
**1.3.1. Check duplicates** : If the supplied combination of target string pair is equal to one another, we must check that the value supplied by [unique words, indexes they appear at] has a length of 2

### 2. Big-O
#### 2.1 Time-Complexity
2.1.1. The time complexity of _*1.1.Create word_dict*_ is O(n) with n being the size of the given wordList
2.1.2.The time complexity of _1.2.Create combinations_ of target strings is O(m) with m being the size of the given target
2.1.2 Each access of value using the dict is assumed to be O(1)
therefore, the total time-complexity Big-O is **O(m+n)**

#### 2.2 Space-Complexity
2.2.1. The space complexity of _*1.1.Create word_dict*_ is O(n) with n being the size of the given wordList
2.1.2.The space complexity of _1.2.Create combinations_ of target strings is O(m) for each assignment of first_half, second_half with m being the size of the given target. for the answer list, given that the question states that it will always have either a length of 0 or 2, we can assign it a space of O(1)
therefore, the total space-complexity Big-O is **O(m+n)**
