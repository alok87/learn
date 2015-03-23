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
import "path/filepath"

// Golbal variables
var projectDir string 									// The Home Directory for the Project, all data checked out here.
var fileCSS,envs,apps string 							// The CSS file for HTML, the env and applications deployed list.
var bldDetailFile string 								// This the file TFS Build writes the current build informatio  after the build.
var reportFile,lastRunDate,endDate,lastDate string 		// The dashboard report and variables to store date between the report is created.
var formatedStartDate,formatedEndDate,startDate string 	// Variables storing the formated date.

// Interface and Types Definations
type CSS struct {}
type Info struct {}
type Checkin struct {}
type Build struct {}
type Environment struct {}
type DashboardComponent interface {
	createReport() string 
}

// Function Definations
func (environment *Environment) createReport() string {
	// This function creates the environment dashboard and returns the buffer
	var buffer bytes.Buffer
	buffer.WriteString("<table class=hovertable><tr><th class=top scope=col colspan=6>Environment Dashboard</th></tr><tr><th class=top scope=col>Environment</th><th class=top scope=col>Application</th><th class=top scope=col>Build-Deployed</th><th class=top scope=col>Start Time</th><th class=top scope=col>End-Time</th><th class=top scope=col>Manifest-deployed</th></tr>")
	
	env_list := strings.Split(envs," ")
	app_list := strings.Split(apps," ")

	for _,env := range env_list {
		for _,app := range app_list {
			buffer.WriteString("<tr><b><th>")
			buffer.WriteString(env)
			buffer.WriteString("</b></th><td>")
			app_name := strings.Split(app,"\\envinfo_")
			buffer.WriteString(app_name[1])
			buffer.WriteString("</td>")

			envDetailFile := filepath.Join(env,app)
			fmt.Println(envDetailFile)

			if _, err := os.Stat(envDetailFile); err == nil {
				envDatafile, Openerr := os.Open(envDetailFile)
				check(Openerr)
				scanner := bufio.NewScanner(envDatafile)
				for scanner.Scan() {
    				lines := strings.Split(scanner.Text(),"#")

    				full_bldLabel := strings.Split(lines[0],"\\")
    				lines[0] = full_bldLabel[7]
					for i:=0; i<len(lines); i++ {
    					buffer.WriteString("<td colspan=1>")
						buffer.WriteString(lines[i])
						buffer.WriteString("</td>")
					}
					buffer.WriteString("</tr>")
				}
			} else {
				buffer.WriteString("<td>-</td><td>Data-not-available</td><td>-</td><td>-</td>")
				//os.Exit(1)
			}
			//buffer.WriteString("<td>-</td><td>-</td><td>-</td><td>-</td></tr>")
		}

}


	buffer.WriteString("</table><br>")
	return buffer.String()
}

func (build *Build) createReport() string {
	// This function creates the build dashboard and returns the buffer
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
	buffer.WriteString("</table><br>")
	return buffer.String()
}

func (checkin *Checkin) createReport() string {
	var buffer,dateTime bytes.Buffer
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
			buffer.WriteString("<tr>")
			buffer.WriteString(insertTableData(": ", "User:", lines[i]))
			buffer.WriteString(insertTableData("Date: ", "Comment:", lines[i]))
			buffer.WriteString(insertTableData("Comment:", "Items:", lines[i]))
			rx_changedBy := regexp.MustCompile(`(User: )(?P<middle>(.)+)(\n)`)
			changeset := findMiddle(rx_changedBy,lines[i])
			buffer.WriteString("<td colspan=1>")
			buffer.WriteString(changeset)
			buffer.WriteString("</td>")
			buffer.WriteString(insertTableData("Items:", "Checkin Notes:", lines[i]))
			buffer.WriteString("</tr>")
		}	
		buffer.WriteString("</table><br>")
	}
	return buffer.String()
}

func (info *Info) createReport() string {
	var buffer bytes.Buffer
	buffer.WriteString("<table class=hovertable><tr><th class=top scope=col colspan=2>Daily Report</th></tr><tr><th class=top scope=col>Cell</th><td align=center>OFS-15: Rewards OMS</td></tr><tr><th class=top scope=col>Starting</th><td align=center>")
	buffer.WriteString(formatedStartDate)
	buffer.WriteString("</td></tr><th class=top scope=col>Ending</th><td align=center>")
	buffer.WriteString(formatedEndDate)
	buffer.WriteString("</td></tr></table><br>")
	return buffer.String()
}

func (css *CSS) createReport() string {
		var buffer bytes.Buffer
		data, err := ioutil.ReadFile(fileCSS)
		check(err)
		buffer.WriteString(string(data))
		return buffer.String()
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
	if ! strings.Contains(out,end) {
			return "-"
	}
	v1 := strings.Index(out,start)
	v2 := strings.Index(out,end)
	v1 = v1 + len(start)
	//v2 = v2 - len(end) + 1
	out = out[v1:v2]	
	return out
}

func insertTableData(from string, to string, line string) string {
	tableData := getMiddle(from, to, line)
	var buffer bytes.Buffer
			buffer.WriteString("<td colspan=1>")
			buffer.WriteString(tableData)
			buffer.WriteString("</td>")
	return buffer.String()
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

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func writeFile(filename string, data []byte, perm os.FileMode) {
	err := ioutil.WriteFile(filename,data,perm)
	check(err)
}

func main() {	

	var buffer_final bytes.Buffer 		// Buffer to store the Dashboard Report.
	var lastRunFile,endRunFile string   // Used for calculating the duration in which the data need to be captured.
 	now := time.Now()           	    // Variable to store the current time. Used for calculating the Total Execution time of the program.	       
	
	// Parse Input - Can be overridden from command line. Eg: dashboard -home "my/customized/path" -lastRunFile "my/new/file"
	flag.StringVar(&projectDir,"home",".","Home-Directory where the source is checked out?")
	flag.StringVar(&lastRunFile,"lastRunFile",".\\lastRun.dat","Last Run File Path?")
	flag.StringVar(&endRunFile,"endRunFile",".\\endRun.dat","End Run File Path?")
	flag.StringVar(&reportFile,"reportFile",".\\report.html","Report File Path?")
	flag.StringVar(&fileCSS,"cssFile",".\\report.css","CSS File Path?")
	flag.StringVar(&bldDetailFile,"bldDetailFile",".\\buildDetail","TFS-Build-Info File Path?")
	flag.StringVar(&envs,"envs","DEV STG PPE","Environement Names")
	flag.StringVar(&apps,"apps","\\envinfo_COM \\envinfo_MC","Application Names")
	flag.Parse()

	// Convert the start and end duration to TFS understood format. Used for calculating the duration to capture data.
	startDate,formatedStartDate = getDate(lastRunFile)
	endDate,formatedEndDate = getDate(endRunFile)
	
   // Generate the Reports and club the dashboard in one single buffer - buffer_final
	dashboards := []DashboardComponent{&CSS{}, &Info{}, &Checkin{}, &Build{}, &Environment{}}
	for _,dashboard :=  range dashboards {
		buffer_final.WriteString(dashboard.createReport())
	}

	// Write the Final Buffer to the reportFile i.e. Dashboard report
	buffer_final.WriteString("<p>Regards,<br><b>GEO-Products1 DevOps</p>")
	final_data := []byte(buffer_final.String())
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
