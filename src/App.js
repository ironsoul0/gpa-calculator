import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import CourseCard from './components/CourseCard';
import { Layout, Button } from 'antd';

const { Header, Footer } = Layout;

class App extends Component {
  state = {
    courses: [
      {
        GPA: 0.0,
        credits: 0,
        visible: true
      }
    ]
  };

  updateCourseGPA = (targetIndex, newGPA) => {
    this.setState(prevState => {
      const prevCourses = prevState.courses;
      prevCourses[targetIndex].GPA = newGPA;
      return {
        courses: prevCourses
      };
    })
  }

  updateCourseCredits = (targetIndex, newCredits) => {
    this.setState(prevState => {
      const prevCourses = prevState.courses;
      prevCourses[targetIndex].credits = newCredits;
      return {
        courses: prevCourses
      };
    })
  }

  addCourse = () => {
    this.setState(prevState => {
      return {
        courses: [...prevState.courses, {
          GPA: 0.0,
          credits: 0,
          visible: true
        }]
      }
    })
  }

  deleteCourse = (targetIndex) => {
    const newCourses = [...this.state.courses];
    newCourses[targetIndex].visible = false;
    this.setState({
      courses: newCourses
    });
  }

  calculateGPA = () => {
    let totalCredits = 0, earnedCredits = 0.0;
    this.state.courses.map(course => {
      if (course.visible) {
        totalCredits += course.credits;
        earnedCredits += course.GPA / 4.0 * course.credits;
      }
      return null;
    })
    if (totalCredits === 0.0) {
      return 'TBA';
    }
    return (earnedCredits / totalCredits * 4.0).toFixed(2);
  }

  render() {
    let realIndex = 0;

    const courses = this.state.courses.map((course, currentIndex) => {
      realIndex += course.visible;

      return (
        <CourseCard
          visible={course.visible}
          realIndex={realIndex}
          index={currentIndex}
          updateCourseGPA={this.updateCourseGPA}
          updateCourseCredits={this.updateCourseCredits}
          deleteCourse={this.deleteCourse}
          key={currentIndex}
        />
      );
    });

    const currentGPA = 'GPA is ' + String(this.calculateGPA());

    return (
      <Layout className="layout">
        <div className="container" style={{ minHeight: window.innerHeight }}>
          <Header style={{ opacity: 0.8 }}>
            <h1 className="logo">GPA Calculator</h1>
          </Header>
          <div className="selectBody">
            {courses}
            <div className="addContainer">
              <Button onClick={this.addCourse} size="large" type="primary" className="addCourse">Add a course</Button>
              <Button size="large" type="dashed" className="resultantGPA">{currentGPA}</Button>
            </div>
          </div>
          <Footer style={{
            textAlign: 'center',
          }}>
            Source code is <a rel="noopener noreferrer" target="_blank" href="https://github.com/ironsoul0/gpa-calculator">here</a>.
            Created by <a rel="noopener noreferrer" target="_blank" href="https://www.ironsoul.me">ironsoul</a>.
          </Footer>
        </div>
      </Layout>
    );
  }
}

export default App;
