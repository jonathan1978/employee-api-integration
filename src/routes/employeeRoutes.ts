import express, { type Router, type Request, type Response, type NextFunction } from 'express'
import { getBambooEmployeeData } from '../integrations/bambooApi'
import { handleError } from '../utils/http'

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

const router: Router = express.Router()

const asyncWrapper = (fn: AsyncHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Promise.resolve(fn(req, res, next)).catch((error) => { handleError(error, res) })
  } catch (error) {
    handleError(error, res)
  }
}

// GET route for /employees
router.get(
  '/:id',
  asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)

    const bambooEmployees = await getBambooEmployeeData(userId)

    if (bambooEmployees.manager_id != null) {
      const { first_name, job_title, last_name } = await getBambooEmployeeData(
        bambooEmployees.manager_id
      )

      if (first_name.length > 0) {
        bambooEmployees.manager = {
          first_name,
          job_title,
          last_name
        }
      }
    }

    res.status(200).json(bambooEmployees)
  })
)

export default router
