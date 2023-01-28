#include <bits/stdc++.h>
#include <cstdlib>
#include <iostream>
#include <fstream>
#include <list>

using namespace std;

int main()
	{
	system("dir /b /ad music > music/list1.txt");
	list<string> mylist;
	string buff;
	ifstream myfile ("music/list1.txt");
	if (myfile.is_open())
	{
		while ( getline (myfile,buff) )
		{
			mylist.push_back(buff);
		}
		myfile.close();
	}
	else cout << "Unable to open file"; 
	list<string> muslist[mylist.size()];
	int i=0;
	string lol;
	for(string x: mylist){
		lol= "dir /b /a-d music\\"+x+" > music/"+x+".txt";
		system(lol.c_str());
		lol="music/"+x+".txt";
		ifstream myfile (lol);
		if (myfile.is_open())
		{
			while ( getline (myfile,buff) )
			{
				muslist[i].push_back(buff);
			}
			myfile.close();
		}
		i++;
	}
	i=0;
	ofstream mynewfile ("js/stations.js");
	if (mynewfile.is_open())
	{
		mynewfile << "export var stationList={";
		for(string x: mylist){
			mynewfile << x << ":[";
			for(string y: muslist[i]){
				mynewfile << "\"" << y << "\"";
				if(y!=muslist[i].back()){
					mynewfile << ",\n";
				}
			}
			mynewfile << "],\n";
			lol="music/"+x+".txt";
				if( remove( lol.c_str() ) != 0 )
					perror( "Error deleting file" );
				else
					puts( "File successfully deleted" );
			i++;
		}
		mynewfile << "rand:[]};";
		mynewfile.close();
	}
	
	if( remove( "music/list1.txt" ) != 0 )
		perror( "Error deleting file" );
	else
		puts( "File successfully deleted" );
	return 0;
}

