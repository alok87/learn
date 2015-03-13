/*
	Dashboard Report

	Description : Prepares a report for checkins and builds done during a time period(/everyday/everyweek/per-release)
				  Also shows the status of the environment. (which label is deployed in which environment)
	
	Usage : dashboard -help

*/

package main

import "fmt"
import "flag"
import "io/ioutil"
import "os"
import "os/exec"
import "bytes"
import "time"
import "regexp"
import "strings"
import "bufio"

// Golbal variables
var projectDir string //The Home Directory for the Project, all data checked out here.
var fileCSS string //The CSS file for HTML
var bldDetailFile string // This the file TFS Build writes the current build informatio  after the build.
var reportFile string // The dashboard report

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func writeFile(filename string, data []byte, perm os.FileMode) {
	err := ioutil.WriteFile(filename,data,perm)
	check(err)
}

//func generateEnv(projectDir string) bytes.Buffer {
//
//}

func generateBuild() bytes.Buffer {
	var buffer bytes.Buffer
	buffer.WriteString("<table class=hovertable><tr><th class=top scope=col colspan=5>Build Dashboard</th></tr><tr><th class=top scope=col>Build-Label</th><th class=top scope=col>Build-Start-Time</th><th class=top scope=col>Build-Duration</th><th class=top scope=col>Build-Triggered-By</th><th class=top scope=col>Status</th></tr><tr>")
	if _, err := os.Stat(bldDetailFile); err == nil {
		buildDatafile, Openerr := os.Open(bldDetailFile)
		check(Openerr)
		scanner := bufio.NewScanner(buildDatafile)
		for scanner.Scan() {
    		lines := strings.Split(scanner.Text(),"#")
    		for i:=0; i<len(lines); i++ {
    			buffer.WriteString("<td colspan=1>")
				buffer.WriteString(lines[i])
				buffer.WriteString("</td>")
			}
			buffer.WriteString("</tr>")
		}
		
		Scanerr := scanner.Err()
		check(Scanerr)
		buildDatafile.Close()
		remove_err := os.Remove(bldDetailFile)
		check(remove_err)	
	}else {
		buffer.WriteString("<td>-</td><td>No-new-builds</td><td>-</td><td>-</td><td>-</td></tr>")
	} 
	buffer.WriteString("</table><br><br>")
	return buffer
}


func generateCheckin(startDate string, endDate string) bytes.Buffer {
	var buffer,dateTime bytes.Buffer
	var changeSet,dateCheckin,comments,changedBy,items string
	buffer.WriteString("<table class=hovertable><tr><th class=top scope=col colspan=5>Checkin Dashboard</th></tr><tr><th class=top scope=col>Changeset</th><th class=top scope=col>Date</th><th class=top scope=col>Comments</th><th class=top scope=col>Changed by</th><th class=top scope=col>Items</th></tr><tr>")
	dateTime.WriteString("/version:")
	dateTime.WriteString(startDate)
	dateTime.WriteString("~")
	dateTime.WriteString(endDate)	
	tfCmd := exec.Command("tf","history","/login:dbt80ccdbt80bld01,DAmx88?aN9=t-Cw","/collection:http://tfsapp.dotcom.tesco.org/tfs/Grocery","$/AcornOMS/Main","/noprompt","/recursive","/format:detailed",dateTime.String())
	tfOut, err := tfCmd.Output()
   	check(err)

	if strings.Contains(string(tfOut),"No history entries were found for the item and version combination specified.") {
		buffer.WriteString("<td align=center>-</td><td align=center>No-new-checkins</td><td align=center>-</td><td align=center>-</td><td align=center>-</td></tr></table><br>")
	}else {
		out := string(tfOut)
		removeLines := regexp.MustCompile("[-]+")
		out = removeLines.ReplaceAllString(out, "")
		lines := strings.Split(out,"Changeset")

		for i:=1; i<len(lines); i++ {
			rx_changeSet := regexp.MustCompile(`(: )(?P<middle>(.)+)(\nUser: )`)
			changeSet = findMiddle(rx_changeSet,lines[i])
			rx_dateCheckin := regexp.MustCompile(`(Date: )(?P<middle>(.)+)(\n)`)
			dateCheckin = findMiddle(rx_dateCheckin,lines[i])
			comments = getMiddle("Comment:","Items:",lines[i])
			rx_changedBy := regexp.MustCompile(`(: )(?P<middle>(.)+)(\nDate: )`)
			changedBy = findMiddle(rx_changedBy,lines[i])
			items = getMiddle("Items:","Checkin Notes:",lines[i])

			buffer.WriteString("<tr><td colspan=1>")
			buffer.WriteString(changeSet)
			buffer.WriteString("</td>")
			
			buffer.WriteString("<td colspan=1>")
			buffer.WriteString(dateCheckin)
			buffer.WriteString("</td>")
			
			buffer.WriteString("<td colspan=1>")
			buffer.WriteString(comments)
			buffer.WriteString("</td>")
	
			buffer.WriteString("<td colspan=1>")
			buffer.WriteString(changedBy)
			buffer.WriteString("</td>")
			
			buffer.WriteString("<td colspan=1>")
			buffer.WriteString(items)
			buffer.WriteString("</td></tr>")
		}	
		buffer.WriteString("</table><br>")
	}
	return buffer
}

func findMiddle(myExp *regexp.Regexp,out string) string{
		match  := myExp.FindStringSubmatch(out)
		result := make(map[string]string)
		for i, name := range myExp.SubexpNames() {
         	result[name] = match[i]
      }
		return result["middle"]
}

func getMiddle(start string, end string,out string) string {
	v1 := strings.Index(out,start)
	v2 := strings.Index(out,end)
	v1 = v1 + len(start)
	v2 = v2 - len(end) + 1
	out = out[v1:v2]	
	return out
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

func generateCss() bytes.Buffer {
		var buffer bytes.Buffer
		data, err := ioutil.ReadFile(fileCSS)
		check(err)
		buffer.WriteString(string(data))
		return buffer
}

func getDate(startRunFile string) (string,string) {
		if _, err := os.Stat(startRunFile); err != nil {
			t := time.Now()
			formated_data := t.Format("Mon Jan _2 15:04:05 2006")
			lastRunDate:= fmt.Sprintf("D%d-%02d-%02dT%02d:%02d:%02dZ",t.Year(), t.Month(), t.Day(),t.Hour(), t.Minute(), t.Second())
			flastRun, errr := os.Create(startRunFile)
			check(errr)
			data := []byte(lastRunDate)
			writeFile(startRunFile, data, 0644)
			flastRun.Close()
			return string(data),string(formated_data)
		}else {
			data, err := ioutil.ReadFile(startRunFile)
			check(err)
			formated_data := getMiddle("D","Z",string(data))
			formated_data = fmt.Sprintf("%s%s",formated_data,"+00:00")
			t,err_time := time.Parse(time.RFC3339,formated_data)
			check(err_time)
			formated_time := t.Format("Mon Jan _2 15:04:05 2006")
			return string(data),string(formated_time)
		}
}

func main() {	
	var buffer_final bytes.Buffer // Buffer to store the Dashboard Report.
	var lastRunFile,endRunFile string  // Used for calculating the duration in which the data need to be captured.
 	now := time.Now()           // Variable to store the current time. Used for calculating the Total Execution time of the program.	       
	
	// Parse Input - Can be overridden from command line. Eg: dashboard -home "my/customized/path" -lastRunFile "my/new/file"
	flag.StringVar(&projectDir,"home","C:\\rewards_daily_dashboard","Home-Directory where the source is checked out?")
	flag.StringVar(&lastRunFile,"lastRunFile","C:\\rewards_daily_dashboard\\lastRun.dat","Last Run File Path?")
	flag.StringVar(&endRunFile,"endRunFile","C:\\rewards_daily_dashboard\\endRun.dat","End Run File Path?")
	flag.StringVar(&reportFile,"reportFile","C:\\rewards_daily_dashboard\\report.html","Report File Path?")
	flag.StringVar(&fileCSS,"cssFile","C:\\rewards_daily_dashboard\\report.css","CSS File Path?")
	flag.StringVar(&bldDetailFile,"bldDetailFile","C:\\rewards_daily_dashboard\\buildDetail","TFS-Build-Info File Path?")
	flag.Parse()

	// Convert the start and end duration to TFS understood format. Used for calculating the duration to capture data.
	startDate,formatedStartDate := getDate(lastRunFile)
	endDate,formatedEndDate := getDate(endRunFile)
	
    /* Different functions called to create different parts of the report. The report has 4 parts. 
    	Info Dashboard
    	Checkin Dashboard
    	Build Dashobard
    	Deployment Dashboard */
	buffer_0 := generateCss()	
	buffer_1 := generateInfo(formatedStartDate,formatedEndDate)
	buffer_2 := generateCheckin(startDate,endDate)	
	buffer_3 := generateBuild()
	//buffer_4 := generateEnv()
	
	// Combine all the buffers to generate a final buffer containing the report.
	buffer_final.WriteString(buffer_0.String())
	buffer_final.WriteString(buffer_1.String())
	buffer_final.WriteString(buffer_2.String())
	buffer_final.WriteString(buffer_3.String())
	//buffer_final.WriteString(buffer_4.String())
	final_data := []byte(buffer_final.String())

	// Write the Final Buffer to the reportFile i.e. Dashboard report
	f,err := os.Create(reportFile)
	check(err)
	defer f.Close()
	writeFile(reportFile,final_data,0755)

	// Modify the lastRun Value in the lastRunFile and print the execution time taken for the program to complete.
	remove_err := os.Remove(lastRunFile)
	check(remove_err)
	rename_err := os.Rename(endRunFile,lastRunFile)
	check(rename_err)	
	fmt.Println("Success\nExecution Time:",time.Since(now))
}
