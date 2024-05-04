using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using UnityEngine;
using UnityEngine.UI;

//This script handles all the logic (Ellioth Romero - A01781724)

public class SimonController : MonoBehaviour
{
    [SerializeField] List<SimonButton> buttons;
    [SerializeField] List<int> sequence;
    [SerializeField] float delay;
    [SerializeField] int level;
    [SerializeField] bool playerTurn = false;
    [SerializeField] int counter = 0;
    [SerializeField] int numButtons;
    [SerializeField] GameObject buttonPrefab;
    [SerializeField] Transform buttonParent;
    [SerializeField] GameObject deserializer;
    ScoreScript scoreScript;
    DeserializerScript deserializerScript;
    [SerializeField] GameObject buttonRetry;
    [SerializeField] GameObject buttonMenu;
    



    // Start is called before the first frame update
    void Start()
    {
        buttonRetry = GameObject.FindGameObjectWithTag("ButtonRetry");
        buttonMenu = GameObject.FindGameObjectWithTag("ButtonMenu");
        scoreScript = GameObject.FindGameObjectWithTag("UIText").GetComponent<ScoreScript>();
        deserializerScript = GameObject.FindGameObjectWithTag("Deserializer").GetComponent<DeserializerScript>();
        PrepareButtons();

    }

    void PrepareButtons()
    {
        for (int i = 0; i < numButtons; i++) {
            int index = i;
            //Create a new button and add it to the list
            GameObject newButton = Instantiate(buttonPrefab, buttonParent);
            newButton.GetComponent<Image>().color= Color.HSVToRGB((float)index / numButtons, 1, 1);
            newButton.GetComponent<SimonButton>().Init(index);
            buttons.Add(newButton.GetComponent<SimonButton>());
            buttons[i].gameObject.GetComponent<Button>().onClick.AddListener(() => ButtonPressed(index));
        }
        // Start the game by adding the first button
        AddToSequence();
    }

    public void ButtonPressed(int index)
    {
        if (playerTurn) {
            if (index == sequence[counter++]) {
                buttons[index].Highlight();
                if (counter == sequence.Count) {
                    playerTurn = false;
                    level++;
                    counter = 0;
                    scoreScript.changeText("Level: " + level);
                    
                    AddToSequence();
                }
            } else {
                deserializerScript.WriteToJson(level);
                buttonRetry.GetComponent<ButtonScript>().moveButton();
                buttonMenu.GetComponent<ButtonScript>().moveButton();
                //buttonRetry.moveButton();
                //buttonMenu.moveButton();
                scoreScript.changeText("Game Over! High scores: " + deserializerScript.highscores.scores[0].score + ", " + deserializerScript.highscores.scores[1].score + ", " + deserializerScript.highscores.scores[2].score);
            }
        }
    }

    void AddToSequence()
    {
        //Add a new button to the sequence
        sequence.Add(Random.Range(0, buttons.Count));
        StartCoroutine(PlaySequence());
    }

    IEnumerator PlaySequence()
    {
        yield return new WaitForSeconds(delay);
        foreach (int index in sequence) {
            buttons[index].Highlight();
            buttons[index].playSound();
            
            yield return new WaitForSeconds(delay);
        }
        playerTurn = true;
    }
    
}
