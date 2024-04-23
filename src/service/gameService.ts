
import { SetresultsDto, TeamDto } from "../dtos/gameDto";
import GameEngine from "../game/engine";
import DesiredResultModel, { DesiredResult } from "../model/desiredresult";
import TeamModel from "../model/team";
import { MatchSchedule, TournamentPredictionsOutcome, UserPredictions } from "../utils";
import MongooseErrorParser from "../utils/mongoosesaverr";



export class GameService {

  async setDiseiredResult(result: SetresultsDto) {

    const { wins, draws, losses, acive } = result

    let model = new DesiredResultModel({ wins, draws, losses, acive });


    try {
      await model.save();


      return {
        message: "Desired Result saved successfully",
        data: model,
        succes: true
      }

    } catch (error) {
      return {
        message: "Desired Result not saved",
        data: null,
        succes: false
      }
    }

  }
  async getDisiredResults() {

    try {
      const results = await DesiredResultModel.find({});


      return {
        message: "getting getDisiredResults was successfully",
        data: results,
        succes: true,
      }

    } catch (error) {

      return {
        message: `Something went wrong ${error}`,
        data: null,
        succes: false
      }

    }

  }
  async getMatch() {

    try {
      const results = await TeamModel.find({});

      // Shuffle the array
      const shuffledArray = MongooseErrorParser.shuffleArray([...results]);

      // Take only the first 12 records
      const selectedRecords = shuffledArray.slice(0, 20);


      return {
        message: `getting ${results?.length} Matches was successfully`,
        data: selectedRecords,
        succes: true,
      }

    } catch (error) {

      return {
        message: `Something went wrong ${error}`,
        data: null,
        succes: false
      }

    }

  }
  async activeDisiredResult() {

    try {
      const result = await DesiredResultModel.findOne({ acive: true });


      return {
        message: "getting activeDisiredResult was successfully",
        data: result,
        succes: true,
      }

    } catch (error) {

      return {
        message: `Something went wrong ${error}`,
        data: null,
        succes: false
      }

    }

  }
  async addteam(dto: TeamDto) {
    const { name, flagUrl } = dto

    let newTeam = new TeamModel()

    newTeam.name = name
    newTeam.flagUrl = flagUrl

    try {

      await newTeam.save();

      return {
        message: "team saved successfully",
        data: newTeam,
        succes: true
      }

    } catch (error) {
      return {
        message: `Something went wrong ${error}`,
        data: null,
        succes: false
      }
    }
  }

  async bet(matchSchedule: MatchSchedule[], userPredictions: UserPredictions[]) {
    try {

      // Set your desired number of wins, draws, and losses
      let desiredResult: DesiredResult;

      const desiredResults = await DesiredResultModel.findOne({ acive: true }).exec();

      desiredResult = desiredResults?.toObject() as DesiredResult;


      // Run a single simulation with the predefined match schedule
      const results = GameEngine.simulateTournament(matchSchedule, desiredResult);

      // Compare predictions against actual results
      const predictionResults = GameEngine.comparePredictions(userPredictions, results);


      return {
        message: "match ended successfully",
        data: { predictionResults, results },
        succes: true
      }


    } catch (error) {
      console.log(error);
      return {
        message: `Something went wrong ${error}`,
        data: null,
        succes: false
      }
    }
  }
}