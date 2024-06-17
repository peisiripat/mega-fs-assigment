import ast

def solve(wordList,target):
    ans = list()
    #create dict of index sets to store unique wordList
    word_dict = dict()
    for idx, word in enumerate(wordList):
        if(word_dict.get(word) == None):
            word_dict[word] = set({idx})
        else :
            word_dict[word].add(idx)
    for i in range(1,len(target)):
        first_half = target[:i]
        second_half = target[i:]
        if(word_dict.get(first_half) == None):
            continue
        elif(word_dict.get(second_half) == None):
            continue
        else:
            # if same check if index set has len 2 
            if first_half == second_half:
                if len(word_dict[first_half]) == 1:
                    continue
                else:
                    pass
            ans.append(first_half)
            ans.append(second_half)
            break
        
    if not ans :
        print("None")
    else :
        print(str(ans))

        


if __name__ == "__main__":
    prompt = ast.literal_eval(input(">please enter wordList: "))
    target = input(">please enter target: ").strip('\"')
    solve(prompt, target)

        
