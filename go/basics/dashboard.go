package main

import "fmt"
import "flag"
import "io/ioutil"
import "os"
import "os/exec"
import "bytes"
import "path/filepath"
import "time"
import "regexp"
import "strings"

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func writeFile(filename string, data []byte, perm os.FileMode) {
	err := ioutil.WriteFile(filename,data,perm)
	check(err)
}

func generateInfo(lastDate string,endDate string) bytes.Buffer {
	var buffer bytes.Buffer
	buffer.WriteString("<table class=hovertable><tr><th class=top scope=col colspan=2>Daily Report: Rewards OMS</th></tr><tr><th class=top scope=col>Cell</th><td align=center>15: Rewards OMS</td></tr><tr><th class=top scope=col>Starting</th><td align=center>")
	buffer.WriteString(lastDate)
	buffer.WriteString("</td></tr><th class=top scope=col>Ending</th><td align=center>")
	buffer.WriteString(endDate)
	buffer.WriteString("</td></tr></table><br>")
	return buffer
}

func generateCheckin(projectDir string, startDate string, endDate string) bytes.Buffer {
	var buffer,dateTime bytes.Buffer
	buffer.WriteString("<table class=hovertable><tr><th class=top scope=col colspan=7>Checkin Dashboard</th></tr><tr><th class=top scope=col>Application</th><th class=top scope=col>Changeset</th><th class=top scope=col>Date</th><th class=top scope=col>Comments</th><th class=top scope=col>Date</th><th class=top scope=col>Changed by</th><th class=top scope=col>Items</th></tr>")
	dateTime.WriteString("/version:")
	dateTime.WriteString(startDate)
	dateTime.WriteString("~")
	dateTime.WriteString(endDate)	
	tfCmd := exec.Command("tf","history","/login:tz31,Tesco20166","/collection:http://tfsapp.dotcom.tesco.org/tfs/Grocery","$/AcornOMS/Main","/noprompt","/recursive","/format:detailed",dateTime.String())
	tfOut, err := tfCmd.Output()
    if err != nil {
        panic(err)
    }
	if strings.Contains(string(tfOut),"No history entries were found for the item and version combination specified.") {
		buffer.WriteString("<tr><td align=center>-</td><td align=center>No new checkins</td><td align=center>-</td><td align=center>-</td><td align=center>-</td><td align=center>-</td><td align=center>-</td></tr>")
	}else {
		out := string(tfOut)
		r := regexp.MustCompile("[-]+")
		out = r.ReplaceAllString(out, "")
		lines := strings.Split(out,"Changeset:")
		for i:=0; i<len(lines);i++ {
			buffer.WriteString("<tr><td colspan=7>")
			buffer.WriteString(lines[i])
			buffer.WriteString("</td></tr>")	
		}
	}
	return buffer
}

func generateCss(projectDir string) bytes.Buffer {
		var buffer  bytes.Buffer
		data, err := ioutil.ReadFile(filepath.Join(projectDir, "header.css"))
		check(err)
		buffer.WriteString(string(data))
		return buffer
}

func getDate(startRunFile string) string {
		if _, err := os.Stat(startRunFile); err != nil {
			t := time.Now()
			lastRunDate:= fmt.Sprintf("D%d-%02d-%02dT%02d:%02d:%02dZ",t.Year(), t.Month(), t.Day(),t.Hour(), t.Minute(), t.Second())
			flastRun, errr := os.Create(startRunFile)
			check(errr)
			data := []byte(lastRunDate)
			writeFile(startRunFile, data, 0644)
			flastRun.Close()
			return string(data)
		}else {
			data, err := ioutil.ReadFile(startRunFile)
			check(err)
			return string(data)
		}
}

func main() {
	// Declare Variables
	var v_app,projectDir string
	var buffer_final bytes.Buffer
	
	// Parse Input
	flag.StringVar(&v_app,"app","AcornOMS","Application-Name")
	flag.StringVar(&projectDir,"home","C:\\rewards_daily_dashboard","Workspace-Directory")
	flag.Parse()
	
	// Calculate duration in which the data should be collected
	startRunFile := filepath.Join(projectDir,"lastRun.dat")
	startDate := getDate(startRunFile)
	endRunFile := filepath.Join(projectDir,"endRun.dat")
	endDate := getDate(endRunFile)
	
    // Generate Different components of the report
	buffer_0 := generateCss(projectDir)	
	buffer_1 := generateInfo(startDate,endDate)
	buffer_2 := generateCheckin(projectDir,startDate,endDate)	
	
	// Combine all and create the report
	report := filepath.Join(projectDir, "report.html")
	f,err := os.Create(report)
	check(err)
	defer f.Close()
	buffer_final.WriteString(buffer_0.String())
	buffer_final.WriteString(buffer_1.String())
	buffer_final.WriteString(buffer_2.String())
	final_data := []byte(buffer_final.String())
	writeFile(report,final_data,0755)
	remove_err := os.Remove(startRunFile)
	check(remove_err)
	rename_err := os.Rename(endRunFile,startRunFile)
	check(rename_err)	
}


