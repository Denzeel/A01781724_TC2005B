using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

//this script handles the functions of the score/mini dialogue text above (Ellioth Romero A01781724)
public class ScoreScript : MonoBehaviour
{
    public TextMeshProUGUI Text;
    void Start()
    {
        Text=GetComponent<TextMeshProUGUI>();
        Text.text="Hello, repeat the patterns to win!";
    }
    public void changeText(string newText){
        Text.text=newText;
    }
}
