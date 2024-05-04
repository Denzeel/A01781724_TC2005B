using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class DeserializerScript : MonoBehaviour
{
    public TextAsset jsonFile;
    
    [System.Serializable]
    public class Score{
            public int score;
    }
    [System.Serializable]
    public class Highscores{
        public Score[] scores;
    }
    public Highscores highscores = new Highscores();

    void Start(){
        ReadFromJson();
    }
    void ReadFromJson(){
        highscores = JsonUtility.FromJson<Highscores>(jsonFile.text);
    }
    public void WriteToJson(int level){
        

        if(level>highscores.scores[0].score){
            highscores.scores[2]=highscores.scores[1];
            highscores.scores[1]=highscores.scores[0];
            highscores.scores[0].score=level;
        }
        else if(level>highscores.scores[1].score || level==highscores.scores[0].score){
            highscores.scores[2]=highscores.scores[1];
            highscores.scores[1].score=level;
        }
        else if(level>highscores.scores[2].score || level==highscores.scores[1].score){
            highscores.scores[2].score=level;
        }
        
        string json = JsonUtility.ToJson(highscores);
        File.WriteAllText(Application.dataPath+"/Static/highscores.json", json);
    }

    
}