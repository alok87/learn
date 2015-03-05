package main

import "fmt"
import "flag"
import "io/ioutil"
import "os"
import "bytes"
import "path/filepath"

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
	
	//variables declaration
	var v_app,projectDir string
	var buffer_css,buffer_t1,buffer_final bytes.Buffer

	//command line input-flags
	flag.StringVar(&v_app,"app","AcornOMS","Application-Name")
	flag.StringVar(&projectDir,"home","C:\\rewards_daily_dashboard","Workspace-Directory")
	flag.Parse()
	
		//create a buffer_css which stores the basic html-report
		fmt.Println(projectDir)
		data, err := ioutil.ReadFile(filepath.Join(projectDir, "header.css"))
		check(err)
		buffer_css.WriteString(string(data))
		
		//general info table
		buffer_t1.WriteString("<table class=hovertable>")
		buffer_t1.WriteString("<tr><th class=top scope=col colspan=2>Daily Report: Rewards OMS</th></tr><tr><th class=top scope=col>Cell</th><td align=center>05_15_HSC_Order-Fulfilment: Rewards OMS</td></tr><tr><th class=top scope=col>Starting</th><td align=center>")
		buffer_t1.WriteString("startdate")
		buffer_t1.WriteString("</tr><th class=top scope=col>Ending</th><td align=center>")
		buffer_t1.WriteString("lastdate</td></tr><table>")
		
	//writing the collected buffer/data to the report
	report := filepath.Join(projectDir, "report.html")
	f,err := os.Create(report)
	check(err)
	defer f.Close()
	buffer_final.WriteString(buffer_css.String())
	buffer_final.WriteString(buffer_t1.String())
	final_data := []byte(buffer_final.String())
	writeFile(report,final_data,0644)
}

